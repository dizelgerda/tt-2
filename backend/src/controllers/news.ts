import { Request, Response, NextFunction } from "express";
import { constants } from "node:http2";
import News from "../models/news";
import mongoose from "mongoose";
import BadRequestError from "../utils/errors/BadRequestError";
import NotFoundError from "../utils/errors/NotFoundError";
import ForbiddenError from "../utils/errors/ForbiddenError";

export async function createNews(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

export async function getNewsByUserID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.app.get("currentUser");
    const { userID } = req.params;

    const [publishedNews, unpublishedNews] = await Promise.all([
      News.find({ owner: currentUser._id, published: true }),
      userID === currentUser._id
        ? News.find({ owner: currentUser._id, published: false })
        : [],
    ]);

    res.send({ publishedNews, unpublishedNews });
  } catch (err) {
    next(err);
  }
}

export async function getNewsByID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { docID: newsID } = req.params;
    const currentUser = req.app.get("currentUser");

    const news = await News.findById(newsID)
      .populate("files")
      .orFail(new NotFoundError());

    if (!news.published && String(news.owner) !== currentUser._id) {
      throw new ForbiddenError();
    }

    res.send(news);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}
