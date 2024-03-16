import { Context } from "../context";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";
import { GraphQLError } from "graphql";

interface FollowUserInput {
  userId: string;
}

export const followUser = isAuthenticated(
  async (_, { userId }: FollowUserInput, ctx: Context) => {
    if (!userId) throw new GraphQLError("User not found");

    if (ctx?.currentUser?.id === userId) {
      throw new GraphQLError("You cannot follow yourself");
    }
    const isFollowing = ctx.currentUser?.following.includes(userId);

    const userExists = await UserModel.findById(userId);

    if (!userExists) {
      throw new GraphQLError("User not found");
    }

    const user = await UserModel.findByIdAndUpdate(
      ctx.currentUser.id,
      !isFollowing
        ? {
            $push: { following: userId },
          }
        : {
            $pull: { following: userId },
          }
    );

    return `You have ${!isFollowing ? "followed" : "unfollowed"} ${
      userExists?.username
    }`;
  }
);
