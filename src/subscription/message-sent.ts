import { isAuthenticated } from "../utilities/is-authenticated";

export const messageSent = {
  subscribe: isAuthenticated(async (_, __, { pubSub, currentUser }) =>
    pubSub.subscribe(`message:${currentUser.id}`)
  ),
  resolve: async ({ message }: any) => message,
};
