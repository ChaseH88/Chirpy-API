import { Context } from '../context';
import { PostModel } from '../models/post';
import { UserModel, UserModelInterface } from '../models/user';

interface EditUserInput {
  id: Pick<UserModelInterface, 'id'>;
  data: Pick<
    UserModelInterface,
    'email' | 'username' | 'firstName' | 'lastName' | 'bio' | 'photo'
  >;
}

export const editUser = async (_, args: EditUserInput, ctx: Context) => {
  const currentUser = await UserModel.findById(ctx.currentUser.id);
  const userToEdit = await UserModel.findById(args.id);

  if (!userToEdit) {
    throw new Error('User not found');
  }

  if (currentUser?.id !== userToEdit.id) {
    throw new Error('You are not authorized to edit this user');
  }

  return await UserModel.findByIdAndUpdate(args.id, args.data, {
    new: true,
  }).populate('posts');
};
