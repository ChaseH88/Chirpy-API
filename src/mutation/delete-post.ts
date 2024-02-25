import { Context } from 'vm';
import { PostModel } from '../models/post';
import { UserModel } from '../models/user';
import { GraphQLError } from 'graphql';

interface DeletePostInput {
  id: string;
}

export const deletePost = async (_, { id }: DeletePostInput, ctx: Context) => {
  const foundPost = await PostModel.findById(id);

  if (!foundPost) {
    throw new GraphQLError('Post not found');
  }

  const currentUser = await UserModel.findById(ctx.currentUser.id);

  if (!currentUser) {
    throw new GraphQLError('User not found');
  }

  if (foundPost.postedBy.toString() !== currentUser.id.toString()) {
    throw new GraphQLError('You are not authorized to delete this post');
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
