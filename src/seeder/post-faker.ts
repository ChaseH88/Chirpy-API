import { faker } from "@faker-js/faker";

const createRandomHTMLContent = () => {
  const paragraphs = Math.floor(Math.random() * 5) + 1;
  let content = "";
  for (let i = 0; i < paragraphs; i++) {
    content += `<p>${faker.lorem.paragraph()}</p>`;
  }
  return content;
};

type PostFakerParams = {
  postedById: string;
};

export const postFaker = ({ postedById }: PostFakerParams) => ({
  _id: faker.database.mongodbObjectId(),
  postedBy: postedById,
  content: createRandomHTMLContent(),
  likes: [],
  dislikes: [],
  comments: [],
});
