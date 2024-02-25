import { PostModel } from "../models/post";
import { UserModel, UserModelInterface } from "../models/user";

interface EditUserInput {
  id: Pick<UserModelInterface, "id">;
  data: Pick<
    UserModelInterface,
    "email" | "username" | "firstName" | "lastName" | "bio" | "photo"
  >;
}

export const editUser = async (_, args: EditUserInput) => {
  const existingUser = await UserModel.findById(args.id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  return await UserModel.findByIdAndUpdate(args.id, args.data, {
    new: true,
  }).populate("posts");
};
