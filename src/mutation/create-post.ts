import { PostModel } from '../models/post';
import { UserModel } from '../models/user';

interface CreatePostArgs {
  data: {
    postedBy: string;
    content: string;
  };
}

export const createPost = async (
  _,
  { data: { postedBy, content } }: CreatePostArgs
) => {
  const currentUser = await UserModel.findById(postedBy);

  if (!currentUser) {
    throw new Error('User not found');
  }

  const post = await PostModel.create({
    postedBy,
    content,
    likes: [],
    dislikes: [],
    comments: [],
  });

  await currentUser.updateOne({ $push: { posts: post._id } });

  return post.populate('postedBy');
};
