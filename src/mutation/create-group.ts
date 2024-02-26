import { GraphQLError } from "graphql";
import { GroupModel } from "../models/group";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "../context";

interface CreateGroupArgs {
  data: {
    name: string;
    description?: string;
    location?: string;
  };
}

export const createGroup = isAuthenticated(
  async (
    _,
    { data: { name, description, location } }: CreateGroupArgs,
    { currentUser }: Context
  ) => {
    const newGroup = {
      name,
      description,
      location,
      createdBy: currentUser.id,
      moderators: [currentUser.id],
      members: [currentUser.id],
      posts: [],
    };

    const group = await GroupModel.create(newGroup);
    await UserModel.updateOne(
      { _id: currentUser.id },
      { $push: { groups: group._id } }
    );

    return group.populate("createdBy");
  }
);
