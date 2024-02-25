import { GraphQLError } from "graphql";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";

interface FindUser {
  id: string;
}

export const findUser = isAuthenticated(async (_, { id }: FindUser) => {
  const user = await UserModel.findById(id).select("-password");

  if (!user) {
    throw new GraphQLError("User not found");
  }

  return user;
});
