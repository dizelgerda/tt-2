import { Request, Response, NextFunction } from "express";
import { constants } from "node:http2";
import News from "../models/news";
import mongoose from "mongoose";
import ValidationError from "../utils/errors/ValidationError";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { text, publishedAt } = req.body;
    const currentUser = req.app.get("currentUser");

    const news = await News.create({
      text,
      published: publishedAt ? false : true,
      publishedAt,
      owner: currentUser._id,
    });

    res.status(constants.HTTP_STATUS_CREATED).send(news);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  }
}
