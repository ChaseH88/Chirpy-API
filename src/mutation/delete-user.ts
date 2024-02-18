import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface DeleteUserInput {
  id: string;
}

export const deleteUser = async (_, { id }: DeleteUserInput) => {
  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    throw new Error('User not found');
  }

  await UserModel.findByIdAndDelete(id);
  await PostModel.deleteMany({ postedBy: id });

  return 'User deleted successfully';
};
