import { GraphQLError } from 'graphql';
import { Context } from '../context';

export const isAuthenticated = (resolver) => {
  return async (_, args, ctx: Context, info) => {
    if (!ctx.currentUser?.id) {
      throw new GraphQLError('You must be logged in to perform this action');
    }

    return resolver(_, args, ctx, info);
  };
};
