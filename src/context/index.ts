import { createPubSub } from "graphql-yoga";
import { UserModel, UserModelInterface } from "../models/user";
import { decodeToken } from "../utilities/json-web-token";

const pubSub = createPubSub();

export interface Context {
  currentUser: Pick<
    UserModelInterface,
    | "id"
    | "email"
    | "username"
    | "firstName"
    | "lastName"
    | "bio"
    | "photo"
    | "createdAt"
    | "updatedAt"
  >;
  pubSub: typeof pubSub;
}

export const apiContext = async (req: any) => {
  const userId =
    decodeToken(req.request.headers.get("authorization"))?.userId || null;
  const user = userId ? await UserModel.findById(userId) : null;
  return {
    ...req,
    pubSub,
    currentUser: user,
  };
};
