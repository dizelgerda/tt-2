import mongoose from "mongoose";
import User from "./user";

interface News {
  text: string;
  owner: mongoose.Schema.Types.ObjectId;
  published: boolean;
  publishedAt: Date;
}

console.log(User.modelName);

const newsSchema = new mongoose.Schema<News>(
  {
    text: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    published: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
    publishedAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User.modelName,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { useProjection: true },
    toObject: { useProjection: true },
  },
);

export default mongoose.model<News>("news", newsSchema);
