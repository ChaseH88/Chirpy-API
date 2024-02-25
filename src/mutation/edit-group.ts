import { PostModel } from "../models/post";
import { GraphQLError } from "graphql";
import { isAuthenticated } from "../utilities/is-authenticated";

interface EditGroupArgs {
  data: {
    id: string;
    name: string;
    description?: string;
    location?: string;
  };
}

export const editGroup = isAuthenticated(
  async (_, { data: { name, description, location, id } }: EditGroupArgs) => {
    const post = await PostModel.findById(id);

    if (!post) {
      throw new GraphQLError("Post not found");
    }

    return await PostModel.findByIdAndUpdate(id, {
      name,
      description,
      location,
    });
  }
);
