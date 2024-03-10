import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "../context";
import { MessageModel } from "../models/message";
import { PostModel, PostModelInterface } from "../models/post";

export const currentUser = isAuthenticated(async (_, __: any, ctx: Context) => {
  if (!ctx.currentUser?.id) {
    throw new GraphQLError("User not found");
  }

  const currentUser = await UserModel.findById(ctx.currentUser.id).populate({
    path: "posts",
    populate: [
      { path: "postedBy" },
      { path: "likes" },
      { path: "dislikes" },
      {
        path: "comments",
        populate: { path: "user" },
      },
    ],
  });

  const messages = await MessageModel.find({
    $or: [{ fromId: currentUser!.id }, { toId: currentUser!.id }],
  })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: "fromId",
        select: "id username firstName lastName photo",
        model: "UserModel",
      },
      {
        path: "toId",
        select: "id username firstName lastName photo",
        model: "UserModel",
      },
    ]);

  const postDocs = await PostModel.find({
    $or: [
      { likes: currentUser!.id },
      { dislikes: currentUser!.id },
      { "comments.user": currentUser!.id },
    ],
  }).populate([
    { path: "postedBy" },
    { path: "likes" },
    { path: "dislikes" },
    {
      path: "comments",
      populate: { path: "user" },
    },
  ]);

  const posts: { [key: string]: PostModelInterface[] } = {
    likes: [],
    dislikes: [],
    comments: [],
  };

  for (const post of postDocs) {
    if (post.likes.some((like) => like.id === currentUser!.id)) {
      posts["likes"].push(post);
    }
    if (post.dislikes.some((dislike) => dislike.id === currentUser!.id)) {
      posts["dislikes"].push(post);
    }
    if (post.comments.some((comment) => comment.user.id === currentUser!.id)) {
      posts["comments"].push(post);
    }
  }

  return {
    user: currentUser,
    messages,
    posts,
  };
});
