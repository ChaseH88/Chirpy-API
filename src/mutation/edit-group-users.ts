import { GroupModel } from "../models/group";
import { UserModel } from "../models/user";

interface EditGroupUsersArgs {
  data: {
    groupId: string;
    userId: [string];
    type: "MEMBER" | "MODERATOR";
    action: "ADD" | "REMOVE";
  };
}

export const editGroupUsers = async (
  _,
  { data: { groupId, userId, type, action } }: EditGroupUsersArgs
) => {
  if (!(await GroupModel.findById(groupId))) {
    throw new Error("Group not found");
  }

  if (!(await UserModel.find({ _id: { $in: userId } }))) {
    throw new Error("User not found");
  }

  const updatedGroup = await GroupModel.findByIdAndUpdate(
    groupId,
    {
      [action === "ADD" ? "$addToSet" : "$pull"]: {
        ...(type === "MEMBER" && {
          members: action === "ADD" ? userId : { $in: userId },
        }),
        ...(type === "MODERATOR" && {
          moderators: action === "ADD" ? userId : { $in: userId },
        }),
      },
    },
    {
      new: true,
    }
  );

  await UserModel.updateMany(
    { _id: { $in: userId } },
    {
      [action === "ADD" ? "$addToSet" : "$pull"]: {
        groups: action === "ADD" ? groupId : { $in: [groupId] },
      },
    }
  );

  return updatedGroup?.populate("members moderators");
};
