import { GraphQLError } from 'graphql';
import { UserModel } from '../models/user';
import { isAuthenticated } from '../utilities/is-authenticated';
import { PostModel } from '../models/post';
import { GroupModel } from '../models/group';

type SearchType = 'USER' | 'POST' | 'GROUP';

interface SearchArgs {
  search: string;
  type: SearchType[];
}

export const search = isAuthenticated(
  async (_, { search, type }: SearchArgs) => {
    if (search.trim() === '') {
      throw new GraphQLError('Search cannot be empty');
    }

    const searchPattern = { $regex: search, $options: 'i' };
    let users: any,
      posts: any,
      groups: any = [];

    if (type.includes('USER')) {
      users = await UserModel.find({
        $or: [
          { username: searchPattern },
          { email: searchPattern },
          { name: searchPattern },
        ],
      }).select('-password');
    }

    if (type.includes('POST')) {
      posts = await PostModel.find({ content: searchPattern }).populate([
        { path: 'postedBy', model: 'UserModel', select: '-password' },
        { path: 'likes', model: 'UserModel', select: '-password' },
        { path: 'dislikes', model: 'UserModel', select: '-password' },
        {
          path: 'comments',
          model: 'CommentModel',
          populate: { path: 'user', model: 'UserModel', select: '-password' },
        },
      ]);
    }

    if (type.includes('GROUP')) {
      groups = await GroupModel.find({
        $or: [
          { name: searchPattern },
          { description: searchPattern },
          { location: searchPattern },
        ],
      }).populate([
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
              populate: {
                path: 'user',
                model: 'UserModel',
                select: '-password',
              },
            },
          ],
        },
      ]);
    }

    return {
      posts,
      users,
      groups,
    };
  }
);
