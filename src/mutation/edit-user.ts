import { Context } from '../context';
import { GraphQLError } from 'graphql';
import { UserModel, UserModelInterface } from '../models/user';

interface EditUserInput {
  id: Pick<UserModelInterface, 'id'>;
  data: Pick<
    UserModelInterface,
    'email' | 'username' | 'firstName' | 'lastName' | 'bio' | 'photo'
  >;
}

export const editUser = async (_, args: EditUserInput, ctx: Context) => {
  const userToEdit = await UserModel.findById(args.id);

  if (!userToEdit) {
    throw new GraphQLError('User not found');
  }

  if (ctx?.currentUser?.id !== userToEdit.id) {
    throw new GraphQLError('You are not authorized to edit this user');
  }

  return await UserModel.findByIdAndUpdate(args.id, args.data, {
    new: true,
  }).populate('posts');
};
