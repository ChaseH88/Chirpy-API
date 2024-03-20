import { GraphQLError } from "graphql";
import { ImageModel } from "../models/image";
import { isAuthenticated } from "../utilities/is-authenticated";
import { Context } from "vm";
import { UserModel } from "../models/user";

interface DeleteImageArgs {
  imageId: string;
}

export const deleteImage = isAuthenticated(
  async (_, { imageId }: DeleteImageArgs, { currentUser }: Context) => {
    const image = await ImageModel.findById(imageId);

    if (!image) {
      throw new GraphQLError("Image not found");
    }

    if (image.uploadedBy.toString() !== currentUser?.id) {
      throw new GraphQLError("You are not authorized to delete this image");
    }

    // TODO: delete image from imgbb api
    // documentation does not provide a way to delete images at this time

    await ImageModel.findByIdAndDelete(imageId);
    await UserModel.findByIdAndUpdate(currentUser?.id, {
      $pull: { images: imageId },
    });

    return "Image deleted";
  }
);
