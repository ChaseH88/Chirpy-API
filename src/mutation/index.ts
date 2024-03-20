import { createUser } from "./create-user";
import { createPost } from "./create-post";
import { createPostComment } from "./create-post-comment";
import { deletePost } from "./delete-post";
import { deleteUser } from "./delete-user";
import { editUser } from "./edit-user";
import { likePost } from "./like-post";
import { dislikePost } from "./dislike-post";
import { login } from "./login";
import { createGroup } from "./create-group";
import { editGroupUsers } from "./edit-group-users";
import { deleteGroup } from "./delete-group";
import { deleteImage } from "./delete-image";
import { sendMessage } from "./send-message";
import { deleteMessage } from "./delete-message";
import { followUser } from "./follow-user";
import { uploadImage } from "./upload-image";
import { readMessages } from "./read-messages";

export const Mutation = {
  createUser,
  createPost,
  createPostComment,
  deletePost,
  deleteUser,
  editUser,
  likePost,
  dislikePost,
  login,
  createGroup,
  editGroupUsers,
  deleteGroup,
  deleteImage,
  sendMessage,
  deleteMessage,
  followUser,
  uploadImage,
  readMessages,
};
