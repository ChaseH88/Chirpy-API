import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface DeletePostInput {
  id: string;
}

export const deletePost = async (_, { id }: DeletePostInput) => {
  const foundPost = await PostModel.findById(id);

  if (!foundPost) {
    throw new Error('Post not found');
  }

  await UserModel.updateMany(
    { posts: id },
    {
      $pull: {
        posts: id,
      },
    }
  );

  await PostModel.findByIdAndDelete(id);

  return 'Post deleted successfully';
};
