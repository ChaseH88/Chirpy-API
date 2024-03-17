import { Context } from "../context";
import { UserModel } from "../models/user";
import { newFollower } from "../subscription/constants";
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

    const userToFollow = await UserModel.findById(userId);

    if (!userToFollow) {
      throw new GraphQLError("User not found");
    }

    if (isFollowing) {
      await UserModel.findByIdAndUpdate(ctx.currentUser.id, {
        $pull: { following: userId },
      });

      await UserModel.findByIdAndUpdate(userId, {
        $pull: { followers: ctx.currentUser.id },
      });

      return `You have unfollowed ${userToFollow?.username}`;
    }

    const user = await UserModel.findByIdAndUpdate(ctx.currentUser.id, {
      $push: { following: userId },
    });

    await UserModel.findByIdAndUpdate(userId, {
      $push: { followers: ctx.currentUser.id },
    });

    ctx.pubSub.publish(newFollower(userToFollow!.id), {
      follower: user,
    });

    return `You have followed ${userToFollow?.username}`;
  }
);
