export const newMessageSent = (userId: string) => `message:new:${userId}`;
export const newMessageDeleted = (userId: string) =>
  `message:deleted:${userId}`;
