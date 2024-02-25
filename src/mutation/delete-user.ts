import { Context } from '../context';
import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface DeleteUserInput {
  id: string;
}

export const deleteUser = async (_, { id }: DeleteUserInput, ctx: Context) => {
  const userToDelete = await UserModel.findById(id);

  if (!userToDelete) {
    throw new Error('User not found');
  }

  if (ctx?.currentUser?.id !== userToDelete.id) {
    throw new Error('You are not authorized to delete this user');
  }

  await UserModel.findByIdAndDelete(id);
  await PostModel.deleteMany({ postedBy: id });

  return 'User deleted successfully';
};
