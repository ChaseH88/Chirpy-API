import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "../context";
import { MessageModel } from "../models/message";

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

  console.log(messages);

  return {
    user: currentUser,
    messages,
  };
});
