import { UserModel } from '../models/user';
import { decodeToken } from '../utilities/json-web-token';

interface CurrentUserArgs {
  token: string;
}

export const currentUser = async (_, { token }: CurrentUserArgs) => {
  const args = decodeToken(token);

  if (!args?.userId) {
    throw new Error('Invalid token');
  }

  const currentUser = await UserModel.findById(args.userId);

  if (!currentUser) {
    throw new Error('User not found');
  }

  return currentUser.populate({
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
};
