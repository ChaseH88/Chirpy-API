import { GroupModel } from "../models/group";

export const allGroups = async () =>
  GroupModel.find().populate("members moderators createdBy posts");
