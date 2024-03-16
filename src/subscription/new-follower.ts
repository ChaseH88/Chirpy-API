import { isAuthenticated } from "../utilities/is-authenticated";
import { newFollower as newFollowerSub } from "./constants";

export const newFollower = {
  subscribe: isAuthenticated(async (_, __, { pubSub, currentUser }) =>
    pubSub.subscribe(newFollowerSub(currentUser.id))
  ),
  resolve: async ({ follower }: any) => follower,
};
