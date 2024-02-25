import { PostModel } from "../models/post";

interface PaginationInput {
  nextToken?: string;
  limit: number;
}

export const allPosts = async (_, { nextToken, limit }: PaginationInput) => {
  const skip = nextToken ? parseInt(nextToken, 10) : 0;

  const posts = await PostModel.find()
    .populate([
      {
        path: "postedBy",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "likes",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "dislikes",
        model: "UserModel",
        select: "-password",
      },
      {
        path: "comments",
        model: "CommentModel",
        populate: {
          path: "user",
          model: "UserModel",
          select: "-password",
        },
      },
    ])
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const totalCount = await PostModel.countDocuments();
  const newNextToken = skip + limit < totalCount ? String(skip + limit) : null;

  return {
    posts,
    totalCount,
    nextToken: newNextToken,
  };
};
