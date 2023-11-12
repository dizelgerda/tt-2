import mongoose from "mongoose";

interface File {
  name: string;
  newsID: mongoose.Schema.Types.ObjectId;
}

const fileSchema = new mongoose.Schema<File>(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    newsID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

export default mongoose.model<File>("file", fileSchema);
