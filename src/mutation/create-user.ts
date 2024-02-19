import { UserModel } from '../models/user';
import { signToken } from '../utilities/json-web-token';

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
  const token = signToken(user.id);

  return { token, user };
};
