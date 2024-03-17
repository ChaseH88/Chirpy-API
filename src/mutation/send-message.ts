import { MessageModel } from "../models/message";
import { UserModel } from "../models/user";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "vm";
import { GroupModel } from "../models/group";
import { newMessageSent } from "../subscription/constants";

interface SendMessageArgs {
  data: {
    toId: string;
    type: "PRIVATE" | "GROUP";
    content: string;
  };
}

export const sendMessage = isAuthenticated(
  async (
    _,
    { data: { toId, type, content } }: SendMessageArgs,
    { pubSub, currentUser }: Context
  ) => {
    const fromId = currentUser.id;
    const model = type === "PRIVATE" ? UserModel : GroupModel;
    const isGroup = type === "GROUP";
    const toUser = await (model as any).findById(toId);

    if (!toUser) {
      throw new GraphQLError("Recipient not found");
    }

    if (
      isGroup &&
      (toUser.members.includes(fromId) || toUser.moderators.includes(fromId))
    ) {
      throw new GraphQLError("You are not a member of this group");
    }

    const message = await MessageModel.create({
      fromId,
      toId,
      type,
      content,
    });

    pubSub.publish(newMessageSent(toUser.id), {
      message: message.populate("fromId"),
    });

    return message;
  }
);
