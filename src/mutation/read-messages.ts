import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "vm";
import { MessageModel } from "../models/message";

interface ReadMessagesArgs {
  messageIds: string[];
}

export const readMessages = isAuthenticated(
  async (_, { messageIds }: ReadMessagesArgs, { currentUser }: Context) => {
    const messages = await MessageModel.find({
      _id: { $in: messageIds },
      toId: currentUser?.id,
    });

    if (!messages) {
      throw new GraphQLError("Messages not found");
    }

    const res = await MessageModel.updateMany(
      { _id: { $in: messageIds } },
      { $set: { hasRead: true, readAt: new Date() } }
    );

    return "Success";
  }
);
