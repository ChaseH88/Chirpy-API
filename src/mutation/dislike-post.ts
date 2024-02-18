import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface DislikePostArgs {
  data: {
    postId: string;
    userId: string;
  };
}

export const dislikePost = async (
  _,
  { data: { postId, userId } }: DislikePostArgs
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
    await PostModel.updateOne(
      {
        id: postId,
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
        id: postId,
      },
      {
        $pull: {
          dislikes: userId,
        },
      }
    );
    return 'Post undisliked';
  }

  await PostModel.updateOne(
    {
      id: postId,
    },
    {
      $push: {
        dislikes: userId,
      },
    }
  );
  return 'You dislike this post!';
};
