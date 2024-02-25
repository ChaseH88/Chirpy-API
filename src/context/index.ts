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

export const apiContext = async (req: any) => {
  const userId =
    decodeToken(req.request.headers.get('authorization'))?.userId || null;
  const user = userId ? await UserModel.findById(userId) : null;
  return {
    ...req,
    currentUser: user,
  };
};
