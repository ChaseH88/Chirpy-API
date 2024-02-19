import { UserModel } from '../models/user';

interface CreateUserInput {
  data: {
    username: string;
    password: string;
  };
}

export const login = async (_, args: CreateUserInput) => {
  const existingUser = await UserModel.findOne({
    username: args.data.username,
  });

  if (!existingUser) {
    throw new Error('User does not exist');
  }

  if (existingUser.password !== args.data.password) {
    throw new Error('Invalid password');
  }

  return existingUser;
};
