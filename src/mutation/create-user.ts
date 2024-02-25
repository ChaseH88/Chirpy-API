import { UserModel } from '../models/user';
import { signToken } from '../utilities/json-web-token';
import { hashPassword } from '../utilities/password';
import { GraphQLError } from 'graphql';

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
    throw new GraphQLError('User already exists');
  }

  const hashedPassword = await hashPassword(args.data.password);

  const user = await UserModel.create({
    ...args.data,
    password: hashedPassword,
  });

  const token = signToken(user.id);

  return { token, user };
};
