import { PostModel } from "../models/post";
import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";

interface CreatePostCommentArgs {
  data: {
    postId: string;
    userId: string;
    comment: string;
  };
}

export const createPostComment = isAuthenticated(
  async (_, { data: { postId, userId, comment } }: CreatePostCommentArgs) => {
    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      throw new GraphQLError("User not found");
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      throw new GraphQLError("Post not found");
    }

    await PostModel.updateOne(
      { _id: postId },
      {
        $push: {
          comments: {
            user: userId,
            comment,
          },
        },
      }
    );

    return "Comment created successfully";
  }
);
