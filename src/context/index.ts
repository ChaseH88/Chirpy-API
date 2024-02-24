import { UserModel } from "../models/user";
import { decodeToken } from "../utilities/json-web-token";

export const apiContext = async (req: any) => {
  const userId =
    decodeToken(req.request.headers.get("authorization"))?.userId || null;
  const user = userId ? await UserModel.findById(userId) : null;
  return {
    ...req,
    currentUser: user,
  };
};
