import { UserModel } from '../models/user';

export const createUser = async (_, args) => {
  const user = new UserModel(args.data);
  await user.save();
  return user;
};
