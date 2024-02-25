import { UserModel } from '../models/user';
import { signToken } from '../utilities/json-web-token';
import { verifyPassword } from '../utilities/password';
import { GraphQLError } from 'graphql';

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
    throw new GraphQLError('User does not exist');
  }

  const validPassword = await verifyPassword(
    args.data.password,
    existingUser.password
  );

  if (!validPassword) {
    throw new GraphQLError('Invalid password');
  }

  const token = signToken(existingUser.id);

  return { token, user: existingUser };
};
