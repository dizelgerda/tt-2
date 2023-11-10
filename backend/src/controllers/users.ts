import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { constants } from "node:http2";
import bcrypt from "bcryptjs";
import User from "../models/user";
import config from "../config";
import AuthError from "../utils/errors/AuthError";
import ValidationError from "../utils/errors/ValidationError";
import NotFoundError from "../utils/errors/NotFoundError";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const hash = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = await User.create({ name, email, password: hash });

    res.status(constants.HTTP_STATUS_CREATED).send({ _id: user._id });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(err.message));
      // } else if (
      //   err && err.code && err.code === 11000
      // ) {
      //   next(new Error("vdkvnd"));
    } else {
      next(err);
    }
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .orFail(new AuthError("Необходима авторизация."));

    if (!(await bcrypt.compare(password, user.password))) {
      throw new AuthError("Необходима авторизация.");
    }

    const token = jwt.sign({ _id: user._id }, config.SECRET_KEY);
    res
      .cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
      })
      .send({ message: "Авторизация прошла успешно" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("jwt").send({ message: "Выход успешен." });
}

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { _id } = req.app.get("currentUser");

    const user = await User.findById(_id).orFail(new NotFoundError());
    res.send(user);
  } catch (err) {
    next(err);
  }
}
