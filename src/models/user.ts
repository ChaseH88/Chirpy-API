import { Document, Schema, model } from "mongoose";
import { PostModelInterface } from "./post";
import { GroupModelInterface } from "./group";
import { ImageModelInterface } from "./image";

export interface UserModelInterface extends Document {
  _id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  photo: string;
  posts: PostModelInterface[];
  groups: GroupModelInterface[];
  following: UserModelInterface[];
  followers: UserModelInterface[];
  blocked: UserModelInterface[];
  images: ImageModelInterface[];
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
    posts: [{ type: Schema.Types.ObjectId, ref: "PostModel", default: [] }],
    groups: [{ type: Schema.Types.ObjectId, ref: "GroupModel", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "UserModel", default: [] }],
    followers: [{ type: Schema.Types.ObjectId, ref: "UserModel", default: [] }],
    images: [{ type: Schema.Types.ObjectId, ref: "ImageModel", default: [] }],
    blocked: [{ type: Schema.Types.ObjectId, ref: "UserModel", default: [] }],
  },
  { timestamps: true }
);

const UserModel = model<UserModelInterface>("UserModel", UserSchema);

export { UserModel };
