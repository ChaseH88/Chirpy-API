import { Document, Schema, model } from 'mongoose';
import { PostModelInterface } from './post';

export interface UserModelInterface extends Document {
  email: string;
  password: string;
  username: string;
  posts: PostModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserModelInterface> = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostModel' }],
  },
  { timestamps: true }
);

const UserModel = model<UserModelInterface>('UserModel', UserSchema);

export { UserModel };
