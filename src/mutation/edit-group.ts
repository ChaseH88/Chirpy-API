import { GroupModel } from "../models/group";
import { PostModel } from "../models/post";
import { UserModel } from "../models/user";

interface EditGroupArgs {
  data: {
    id: string;
    name: string;
    description?: string;
    location?: string;
  };
}

export const editGroup = async (
  _,
  { data: { name, description, location, id } }: EditGroupArgs
) => {
  const post = await PostModel.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return await PostModel.findByIdAndUpdate(id, {
    name,
    description,
    location,
  });
};