import { Context } from "../context";
import { PostModel } from "../models/post";
import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";

interface DeleteUserInput {
  id: string;
}

export const deleteUser = isAuthenticated(
  async (_, { id }: DeleteUserInput, ctx: Context) => {
    const userToDelete = await UserModel.findById(id);

    if (!userToDelete) {
      throw new GraphQLError("User not found");
    }

    if (ctx?.currentUser?.id !== userToDelete.id) {
      throw new GraphQLError("You are not authorized to delete this user");
    }

    await UserModel.findByIdAndDelete(id);
    await PostModel.deleteMany({ postedBy: id });

    return "User deleted successfully";
  }
);
