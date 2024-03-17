import { MessageModel } from "../models/message";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "vm";
import { newMessageDeleted } from "../subscription/constants";

interface DeleteMessageArgs {
  id: string;
}

export const deleteMessage = isAuthenticated(
  async (_, { id }: DeleteMessageArgs, { pubSub, currentUser }: Context) => {
    const message = await MessageModel.findById(id);

    if (!message) {
      throw new GraphQLError("Message not found");
    }

    if (message.fromId.toString() !== currentUser.id) {
      throw new GraphQLError("You are not authorized to delete this message");
    }

    await MessageModel.findByIdAndDelete(id);

    pubSub.publish(newMessageDeleted(message.toId.id), {
      message: message.id,
    });

    return "Message deleted";
  }
);
