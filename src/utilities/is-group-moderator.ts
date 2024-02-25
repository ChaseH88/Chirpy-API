import { GraphQLError } from "graphql";
import { Context } from "../context";
import { GroupModel } from "../models/group";

export const isGroupModerator = (resolver) => {
  return async (_, args, ctx: Context, info) => {
    if (!args?.groupId) {
      throw new GraphQLError("Group id not found");
    }

    const group = await GroupModel.findById(args?.groupId);

    if (!group) {
      throw new GraphQLError("Group not found");
    }

    if (!group.moderators.includes(ctx.currentUser.id)) {
      throw new GraphQLError("You are not authorized to perform this action");
    }

    return resolver(_, args, ctx, info);
  };
};
