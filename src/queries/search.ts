import { GraphQLError } from "graphql";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";
import { PostModel } from "../models/post";
import { GroupModel } from "../models/group";

type SearchType = "USER" | "POST" | "GROUP";

interface SearchArgs {
  search: string;
  type: SearchType[];
}

export const search = isAuthenticated(
  async (_, { search, type }: SearchArgs) => {
    if (search.trim() === "") {
      throw new GraphQLError("Search cannot be empty");
    }

    const searchPattern = { $regex: search, $options: "i" };
    const searchAll = search === "*";
    let users: any = [],
      posts: any = [],
      groups: any = [];

    if (type.includes("USER")) {
      let found = [];
      if (searchAll) {
        found = await UserModel.find({}).select("-password");
      } else {
        found = await UserModel.aggregate([
          {
            $addFields: {
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
            },
          },
          {
            $match: {
              $or: [{ username: searchPattern }, { fullName: searchPattern }],
            },
          },
          {
            $project: { password: 0 },
          },
        ]);
      }
      users = found.map((user: any) => ({ ...user, id: user._id }));
    }

    if (type.includes("POST")) {
      const populate = [
        { path: "postedBy", model: "UserModel", select: "-password" },
        { path: "likes", model: "UserModel", select: "-password" },
        { path: "dislikes", model: "UserModel", select: "-password" },
        {
          path: "comments",
          model: "CommentModel",
          populate: { path: "user", model: "UserModel", select: "-password" },
        },
      ];

      if (searchAll) {
        posts = await PostModel.find().populate(populate);
      } else {
        posts = await PostModel.find({ content: searchPattern }).populate(
          populate
        );
      }
    }

    if (type.includes("GROUP")) {
      const populate = [
        { path: "createdBy", model: "UserModel", select: "-password" },
        { path: "moderators", model: "UserModel", select: "-password" },
        { path: "members", model: "UserModel", select: "-password" },
        {
          path: "posts",
          model: "PostModel",
          populate: [
            { path: "postedBy", model: "UserModel", select: "-password" },
            { path: "likes", model: "UserModel", select: "-password" },
            { path: "dislikes", model: "UserModel", select: "-password" },
            {
              path: "comments",
              model: "CommentModel",
              populate: {
                path: "user",
                model: "UserModel",
                select: "-password",
              },
            },
          ],
        },
      ];
      if (searchAll) {
        groups = await GroupModel.find().populate(populate);
      } else {
        groups = await GroupModel.find({
          $or: [
            { name: searchPattern },
            { description: searchPattern },
            { location: searchPattern },
          ],
        }).populate(populate);
      }
    }

    return {
      posts,
      users,
      groups,
    };
  }
);
