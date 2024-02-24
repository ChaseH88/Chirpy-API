import { Document, Schema, model } from "mongoose";
import { PostModelInterface } from "./post";
import { GroupModelInterface } from "./group";

export interface UserModelInterface extends Document {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  photo: string;
  posts: PostModelInterface[];
  groups: GroupModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserModelInterface> = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    photo: { type: String, default: "DEFAULT" },
    posts: [{ type: Schema.Types.ObjectId, ref: "PostModel" }],
    groups: [{ type: Schema.Types.ObjectId, ref: "GroupModel" }],
  },
  { timestamps: true }
);

const UserModel = model<UserModelInterface>("UserModel", UserSchema);

export { UserModel };
