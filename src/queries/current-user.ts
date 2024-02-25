import { UserModel } from '../models/user';
import { decodeToken } from '../utilities/json-web-token';
import { GraphQLError } from 'graphql';
import { isAuthenticated } from '../utilities/is-authenticated';
import { Context } from '../context';

export const currentUser = isAuthenticated(async (_, __: any, ctx: Context) => {
  if (!ctx.currentUser?.id) {
    throw new GraphQLError('User not found');
  }

  const currentUser = await UserModel.findById(ctx.currentUser.id);

  // Optionally populate related data
  return currentUser!.populate({
    path: 'posts',
    populate: [
      { path: 'postedBy' },
      { path: 'likes' },
      { path: 'dislikes' },
      {
        path: 'comments',
        populate: { path: 'user' },
      },
    ],
  });
});
