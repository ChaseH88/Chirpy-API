import { PostModel } from "../models/post";

export const allPosts = async () =>
  await PostModel.find()
    .populate([
      {
        path: "postedBy",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "likes",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "dislikes",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "comments",
        model: "CommentModel",
        populate: {
          path: "user",
          model: "UserModel",
          select: "-password",
        },
      },
    ])
    .sort({ createdAt: -1 });
