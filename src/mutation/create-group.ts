import { GraphQLError } from "graphql";
import { GroupModel } from "../models/group";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";

interface CreateGroupArgs {
  data: {
    name: string;
    description?: string;
    location?: string;
    createdBy: string;
  };
}

export const createGroup = isAuthenticated(
  async (
    _,
    { data: { name, description, location, createdBy } }: CreateGroupArgs
  ) => {
    const currentUser = await UserModel.findById(createdBy);

    if (!currentUser) {
      throw new GraphQLError("User not found");
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
  }
);
