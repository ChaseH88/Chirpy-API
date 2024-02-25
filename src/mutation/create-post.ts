import { Context } from '../context';
import { PostModel } from '../models/post';
import { UserModel } from '../models/user';
import { GraphQLError } from 'graphql';

interface CreatePostArgs {
  data: {
    content: string;
  };
}

export const createPost = async (
  _,
  { data: { content } }: CreatePostArgs,
  ctx: Context
) => {
  const currentUser = await UserModel.findById(ctx.currentUser.id);

  if (!currentUser) {
    throw new GraphQLError('User not found');
  }

  const post = await PostModel.create({
    postedBy: currentUser.id,
    content,
    likes: [],
    dislikes: [],
    comments: [],
  });

  await currentUser.updateOne({ $push: { posts: post._id } });

  return post.populate('postedBy');
};
