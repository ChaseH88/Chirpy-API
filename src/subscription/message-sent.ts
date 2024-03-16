import { isAuthenticated } from "../utilities/is-authenticated";
import { newMessageSent, newMessageDeleted } from "./constants";

export const messageSent = {
  subscribe: isAuthenticated(async (_, __, { pubSub, currentUser }) =>
    pubSub.subscribe(newMessageSent(currentUser.id))
  ),
  resolve: async ({ message }: any) => message,
};
