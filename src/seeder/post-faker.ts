import { faker } from "@faker-js/faker";

type PostFakerParams = {
  postedById: string;
};

export const postFaker = ({ postedById }: PostFakerParams) => ({
  _id: faker.database.mongodbObjectId(),
  postedBy: postedById,
  content: faker.lorem.paragraph(),
  likes: [],
  dislikes: [],
  comments: [],
});
