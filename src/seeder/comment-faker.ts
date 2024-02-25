import { faker } from "@faker-js/faker";

type CommentFakerParams = {
  postedById: string;
};

export const commentFaker = ({ postedById }: CommentFakerParams) => {
  const date = faker.date.recent();
  return {
    user: postedById,
    comment: faker.lorem.paragraph(),
    createdAt: date,
    updatedAt: date,
  };
};
