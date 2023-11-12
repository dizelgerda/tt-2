import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import BadRequestError from "../utils/errors/BadRequestError";
import ForbiddenError from "../utils/errors/ForbiddenError";
import NotFoundError from "../utils/errors/NotFoundError";
import News from "../models/news";
import File from "../models/file";
import fs from "fs";
import path from "node:path";
import { constants } from "node:http2";

export async function uploadFiles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { docID } = req.params;
    const currentUser = req.app.get("currentUser");
    const files = [];

    if (!req.files) {
      throw new BadRequestError("Фалы отсутствуют.");
    }

    const news = await News.findById(docID).orFail(new NotFoundError());

    if (String(news.owner) !== currentUser._id) {
      throw new ForbiddenError();
    }

    for (const key of Object.keys(req.files)) {
      const file = req.files[key] as UploadedFile;
      const doc = new File({
        name: file.name,
        newsID: news._id,
      });

      fs.writeFileSync(
        path.join(".", "files", `${doc._id}-${doc.name}`),
        file.data,
      );
      await doc.save();
      files.push(doc._id);
    }

    await news.updateOne({ $set: { files } });

    res
      .status(constants.HTTP_STATUS_CREATED)
      .send({ message: "Файл сохранен." });
  } catch (err) {
    next(err);
  }
}

export async function getFileByID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { docID } = req.params;
    const currentUser = req.app.get("currentUser");

    const file = await File.findById(docID).orFail(new NotFoundError());
    const news = await News.findById(file.newsID).orFail(new NotFoundError());

    if (!news.published && String(news.owner) !== currentUser._id) {
      throw new ForbiddenError();
    }

    res.sendFile(
      path.join(__dirname, "..", "..", "files", `${file._id}-${file.name}`),
    );
  } catch (err) {
    next(err);
  }
}
