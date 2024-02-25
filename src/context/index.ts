import { GraphQLError } from 'graphql';
import { UserModel, UserModelInterface } from '../models/user';
import { decodeToken } from '../utilities/json-web-token';

export interface Context {
  currentUser: Pick<
    UserModelInterface,
    | 'id'
    | 'email'
    | 'username'
    | 'firstName'
    | 'lastName'
    | 'bio'
    | 'photo'
    | 'createdAt'
    | 'updatedAt'
  >;
}

const publicResolvers = [
  'CreateUser',
  'Login',
  'CurrentUser',
  'GetUsers',
  'GetPosts',
];

export const protectedResolvers = [
  'CreateGroup',
  'CreatePostComment',
  'CreatePost',
  'DeletePost',
  'DeleteUser',
  'DislikePost',
  'EditGroupUsers',
  'EditGroup',
  'EditUser',
  'LikePost',
];

const allResolvers = [...publicResolvers, ...protectedResolvers];

export const apiContext = async (req: any) => {
  if (!allResolvers.includes(req.params?.operationName)) {
    throw new GraphQLError('Operation not supported');
  }

  const userId =
    decodeToken(req.request.headers.get('authorization'))?.userId || null;
  const user = userId ? await UserModel.findById(userId) : null;

  if (protectedResolvers.includes(req.params?.operationName) && !user) {
    throw new GraphQLError('You must be logged in to perform this action');
  }

  return {
    ...req,
    currentUser: user,
  };
};
