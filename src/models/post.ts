import { Document, Schema, model } from 'mongoose';

export interface PostModelInterface extends Document {
  postedBy: string; // will be the user's id when model is created
  content: string;
  likes: string[]; // user id's will be stored in an array when model is created
  dislikes: string[]; // user id's will be stored in an array when model is created
  comments: {
    user: string; // will be the user's id when model is created
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<PostModelInterface> = new Schema(
  {
    postedBy: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: String }],
    dislikes: [{ type: String }],
    comments: [
      {
        user: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = model<PostModelInterface>('PostModel', PostSchema);

export { PostModel };
