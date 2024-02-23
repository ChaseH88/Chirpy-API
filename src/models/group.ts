import { Document, Schema, model } from "mongoose";
import { UserModelInterface } from "./user";
import { PostModelInterface } from "./post";

export interface GroupModelInterface extends Document {
  name: string;
  description?: string;
  location?: string;
  createdBy: UserModelInterface;
  moderators: UserModelInterface[];
  members: UserModelInterface[];
  posts: PostModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema<GroupModelInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "PostModel",
      },
    ],
  },
  { timestamps: true }
);

const GroupModel = model<GroupModelInterface>("GroupModel", GroupSchema);

export { GroupModel };
