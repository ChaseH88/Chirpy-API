import { UserModel } from '../models/user';

export const allUsers = async () =>
  await UserModel.find()
    .populate({
      path: 'posts',
      model: 'PostModel',
    })
    .select('-password');
