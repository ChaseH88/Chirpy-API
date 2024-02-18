import { Document, Schema, model } from 'mongoose';
import { UserModelInterface } from './user';

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
  };
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<PostModelInterface> = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
        comment: { type: String, required: true },
      },
      {
        timestamps: true,
      },
    ],
  },
  { timestamps: true }
);

const PostModel = model<PostModelInterface>('PostModel', PostSchema);

export { PostModel };
