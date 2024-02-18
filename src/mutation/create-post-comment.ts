import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface CreatePostCommentArgs {
  data: {
    postId: string;
    userId: string;
    comment: string;
  };
}

export const createPostComment = async (
  _,
  { data: { postId, userId, comment } }: CreatePostCommentArgs
) => {
  const currentUser = await UserModel.findById(userId);

  if (!currentUser) {
    throw new Error('User not found');
  }

  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error('Post not found');
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

  return 'Comment created successfully';
};
