import { PostModel } from "../models/post";
import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";

interface DislikePostArgs {
  data: {
    postId: string;
    userId: string;
  };
}

export const dislikePost = isAuthenticated(
  async (_, { data: { postId, userId } }: DislikePostArgs) => {
    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      throw new GraphQLError("User not found");
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      throw new GraphQLError("Post not found");
    }

    if (post.likes.includes(userId as any)) {
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          $pull: {
            likes: userId,
          },
        }
      );
    }

    if (post.dislikes.includes(userId as any)) {
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          $pull: {
            dislikes: userId,
          },
        }
      );
      return "Post undisliked";
    }

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          dislikes: userId,
        },
      }
    );
    return "You dislike this post!";
  }
);
