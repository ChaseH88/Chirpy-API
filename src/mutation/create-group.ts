import { GroupModel } from "../models/group";
import { PostModel } from "../models/post";
import { UserModel } from "../models/user";

interface CreateGroupArgs {
  data: {
    name: string;
    description?: string;
    location?: string;
    createdBy: string;
  };
}

export const createGroup = async (
  _,
  { data: { name, description, location, createdBy } }: CreateGroupArgs
) => {
  const currentUser = await UserModel.findById(createdBy);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const newGroup = {
    name,
    description,
    location,
    createdBy,
    moderators: [createdBy],
    members: [createdBy],
    posts: [],
  };

  const group = await GroupModel.create(newGroup);
  await currentUser.updateOne({ $push: { groups: group._id } });

  return group.populate("createdBy");
};
