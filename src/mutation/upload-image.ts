import { Context } from "../context";
import { ImageModel } from "../models/image";
import { UserModel } from "../models/user";
import { isAuthenticated } from "../utilities/is-authenticated";
import { GraphQLError } from "graphql";

interface UploadImageInput {
  file: File;
}

export const uploadImage = isAuthenticated(
  async (_, { file }: UploadImageInput, ctx: Context) => {
    console.log("file", file);

    try {
      const user = await UserModel.findById(ctx.currentUser?.id);
      if (!user) {
        throw new GraphQLError("User not found");
      }

      if (user?.images.length >= 10) {
        throw new GraphQLError(
          "You have reached the maximum number of images allowed"
        );
      }

      const form = new FormData();
      form.append("image", file, file.name);
      form.append("key", process.env.IMG_BB_API_KEY as string);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new GraphQLError("Failed to upload image to Imgbb");
      }

      const { data } = await response.json();

      const image = await ImageModel.create({
        name: data.image.filename,
        imageUrl: data.url,
        thumbnailUrl: data.thumb.url,
        deleteUrl: data.delete_url,
        uploadedBy: ctx.currentUser?.id,
        size: data.size,
      });

      await UserModel.findByIdAndUpdate(ctx.currentUser?.id, {
        $push: { images: image._id },
      });

      return "Image uploaded successfully";
    } catch (error) {
      console.error("Error uploading image:", error);
      return "Error uploading image";
    }
  }
);
