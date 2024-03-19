import { Document, Schema, model } from "mongoose";
import { UserModelInterface } from "./user";

export interface ImageModelInterface extends Document {
  _id: string;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
  deleteUrl: string;
  uploadedBy: UserModelInterface;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema<ImageModelInterface> = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    deleteUrl: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const ImageModel = model<ImageModelInterface>("ImageModel", ImageSchema);

export { ImageModel };
