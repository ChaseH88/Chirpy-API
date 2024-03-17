import { Context } from "../context";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { PostModel } from "../models/post";
import { UserModel } from "../models/user";

interface DeleteUserInput {
  id: string;
}

export const deleteUser = isAuthenticated(
  async (_, { id }: DeleteUserInput, ctx: Context) => {
    const session = await UserModel.startSession();
    session.startTransaction();

    try {
      const userToDelete = await UserModel.findById(id).session(session);
      if (!userToDelete) {
        throw new GraphQLError("User not found");
      }

      if (ctx?.currentUser?.id !== userToDelete.id) {
        throw new GraphQLError("You are not authorized to delete this user");
      }

      await UserModel.findByIdAndDelete(id).session(session);
      await PostModel.deleteMany({ postedBy: id }).session(session);

      const updateConditions = [
        { following: id },
        { followers: id },
        { blocked: id },
        { likes: id },
        { dislikes: id },
      ];
      for (let condition of updateConditions) {
        await UserModel.updateMany(condition, { $pull: condition }).session(
          session
        );
        await PostModel.updateMany(condition, { $pull: condition }).session(
          session
        );
      }

      await session.commitTransaction();
      session.endSession();
      return "User deleted successfully";
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
);
