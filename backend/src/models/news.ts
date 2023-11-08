import mongoose from "mongoose";
import User from "./user";

interface News {
  data: string;
  owner: mongoose.Schema.Types.ObjectId;
}

const newsSchema = new mongoose.Schema<News>(
  {
    data: {
      type: mongoose.Schema.Types.String,
      required: true,
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
