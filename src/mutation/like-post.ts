import { PostModel } from '../models/post';
import { UserModel } from '../models/user';
import { GraphQLError } from 'graphql';

interface LikePostArgs {
  data: {
    postId: string;
    userId: string;
  };
}

export const likePost = async (
  _,
  { data: { postId, userId } }: LikePostArgs
) => {
  const currentUser = await UserModel.findById(userId);

  if (!currentUser) {
    throw new GraphQLError('User not found');
  }

  const post = await PostModel.findById(postId);

  if (!post) {
    throw new GraphQLError('Post not found');
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
  }

  if (post.likes.includes(userId as any)) {
    await PostModel.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: userId,
        },
      }
    );
    return 'Post unliked';
  }

  await PostModel.updateOne(
    { _id: postId },
    {
      $push: {
        likes: userId,
      },
    }
  );

  return 'You like this post!';
};
