export const messageSent = {
  subscribe: async (_, __, { pubSub, currentUser }) =>
    pubSub.subscribe(`message:${currentUser.id}`),
  resolve: async ({ message }: any) => message,
};
