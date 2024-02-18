import { createUser } from './create-user';
import { createPost } from './create-post';
import { createPostComment } from './create-post-comment';
import { deletePost } from './delete-post';
import { deleteUser } from './delete-user';
import { likePost } from './like-post';

export const Mutation = {
  createUser,
  createPost,
  createPostComment,
  deletePost,
  deleteUser,
  likePost,
};
