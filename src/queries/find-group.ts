import { GraphQLError } from 'graphql';
import { isAuthenticated } from '../utilities/is-authenticated';
import { GroupModel } from '../models/group';

interface FindGroup {
  id: string;
}

export const findGroup = isAuthenticated(async (_, { id }: FindGroup) => {
  const group = await GroupModel.findById(id).populate([
    { path: 'createdBy', model: 'UserModel', select: '-password' },
    { path: 'moderators', model: 'UserModel', select: '-password' },
    { path: 'members', model: 'UserModel', select: '-password' },
    {
      path: 'posts',
      model: 'PostModel',
      populate: [
        { path: 'postedBy', model: 'UserModel', select: '-password' },
        { path: 'likes', model: 'UserModel', select: '-password' },
        { path: 'dislikes', model: 'UserModel', select: '-password' },
        {
          path: 'comments',
          model: 'CommentModel',
          populate: { path: 'user', model: 'UserModel', select: '-password' },
        },
      ],
    },
  ]);

  if (!group) {
    throw new GraphQLError('Group not found');
  }

  return group;
});
