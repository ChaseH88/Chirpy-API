import { Document, Schema, model } from "mongoose";
import { UserModelInterface } from "./user";

export interface PostModelInterface extends Document {
  postedBy: UserModelInterface;
  content: string;
  likes: UserModelInterface[];
  dislikes: UserModelInterface[];
  comments: {
    user: UserModelInterface;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  history: {
    content: string;
    editedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<PostModelInterface> = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    history: [
      {
        content: { type: String, required: true },
        editedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = model<PostModelInterface>("PostModel", PostSchema);

export { PostModel };
