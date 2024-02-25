import { PostModel } from '../models/post';
import { paginate } from '../utilities/pagination';

interface PaginationInput {
  nextToken?: string;
  limit: number;
}

export const allPosts = async (_, { nextToken, limit }: PaginationInput) =>
  paginate({
    model: PostModel,
    paginationInput: { nextToken, limit },
    populate: [
      { path: 'postedBy', model: 'UserModel', select: '-password' },
      { path: 'likes', model: 'UserModel', select: '-password' },
      { path: 'dislikes', model: 'UserModel', select: '-password' },
      {
        path: 'comments',
        model: 'CommentModel',
        populate: { path: 'user', model: 'UserModel', select: '-password' },
      },
    ],
  });
