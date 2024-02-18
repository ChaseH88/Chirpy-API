import { UserModel } from '../models/user';

interface CreateUserInput {
  data: {
    username: string;
    password: string;
    email: string;
  };
}

export const createUser = async (_, args: CreateUserInput) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: args.data.email }, { username: args.data.username }],
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await UserModel.create(args.data);
  return user.populate('posts');
};
