import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";

export const allUsers = isAuthenticated(
  async () =>
    await UserModel.find()
      .populate({
        path: "posts",
        model: "PostModel",
      })
      .select("-password")
);
