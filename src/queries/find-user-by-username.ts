import { GraphQLError } from "graphql";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";

interface FindUserByUsername {
  username: string;
}

export const findUserByUsername = isAuthenticated(
  async (_, { username }: FindUserByUsername) => {
    const user = await UserModel.findOne({ username })
      .populate([
        {
          path: "following",
        },
        {
          path: "followers",
        },
        {
          path: "blocked",
        },
        {
          path: "posts",
          populate: [
            { path: "postedBy" },
            { path: "likes" },
            { path: "dislikes" },
            {
              path: "comments",
              populate: { path: "user" },
            },
          ],
        },
      ])
      .select("-password");

    if (!user) {
      throw new GraphQLError("User not found");
    }

    return user;
  }
);
