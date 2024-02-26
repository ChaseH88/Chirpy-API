import { GraphQLError } from "graphql";
import { GroupModel } from "../models/group";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "../context";

interface DeleteGroupArgs {
  groupId: string;
}

export const deleteGroup = isAuthenticated(
  async (_, { groupId }: DeleteGroupArgs, { currentUser }: Context) => {
    const group = await GroupModel.findById(groupId);

    if (!group) {
      throw new GraphQLError("Group not found");
    }

    if (!group.moderators.includes(currentUser.id)) {
      throw new GraphQLError("You are not authorized to delete this group");
    }

    const userIds = new Set([
      ...group.members.map((member) => member._id),
      ...group.moderators.map((moderator) => moderator._id),
      group.createdBy,
    ]);

    await UserModel.updateMany(
      {
        _id: {
          $in: Array.from(userIds),
        },
      },
      {
        $pull: {
          groups: groupId,
        },
      }
    );

    await GroupModel.deleteOne({
      _id: groupId,
    });

    return "Group deleted successfully";
  }
);
