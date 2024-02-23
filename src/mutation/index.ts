import { createUser } from "./create-user";
import { createPost } from "./create-post";
import { createPostComment } from "./create-post-comment";
import { deletePost } from "./delete-post";
import { deleteUser } from "./delete-user";
import { editUser } from "./edit-user";
import { likePost } from "./like-post";
import { login } from "./login";
import { createGroup } from "./create-group";

export const Mutation = {
  createUser,
  createPost,
  createPostComment,
  deletePost,
  deleteUser,
  editUser,
  likePost,
  login,
  createGroup,
};
