import { Document, Schema, model } from "mongoose";
import { UserModelInterface } from "./user";
import { GroupModelInterface } from "./group";

export interface MessageModelInterface extends Document {
  fromId: UserModelInterface;
  toId: UserModelInterface | GroupModelInterface;
  type: "PRIVATE" | "GROUP";
  content: string;
  likes: UserModelInterface[];
  dislikes: UserModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema<MessageModelInterface> = new Schema(
  {
    fromId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    toId: { type: Schema.Types.Mixed, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["PRIVATE", "GROUP"], required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  },
  { timestamps: true }
);

const MessageModel = model<MessageModelInterface>(
  "MessageModel",
  MessageSchema
);

export { MessageModel };
