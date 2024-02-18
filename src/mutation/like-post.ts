import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

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
    throw new Error('User not found');
  }

  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.likes.includes(userId as any)) {
    return 'You have already liked the post';
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
