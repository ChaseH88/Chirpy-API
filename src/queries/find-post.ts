import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { PostModel } from "../models/post";

interface FindPost {
  id: string;
}

export const findPost = isAuthenticated(async (_, { id }: FindPost) => {
  const user = await PostModel.findById(id).populate([
    { path: "postedBy", model: "UserModel", select: "-password" },
    { path: "likes", model: "UserModel", select: "-password" },
    { path: "dislikes", model: "UserModel", select: "-password" },
    {
      path: "comments",
      model: "CommentModel",
      populate: { path: "user", model: "UserModel", select: "-password" },
    },
  ]);

  if (!user) {
    throw new GraphQLError("User not found");
  }

  return user;
});
