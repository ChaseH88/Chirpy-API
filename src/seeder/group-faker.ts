import { faker } from "@faker-js/faker";

type GroupFakerParams = {
  createdById: string;
  moderators?: string[];
  members?: string[];
  posts?: string[];
};

export const groupFaker = (params: GroupFakerParams) => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.word.words({
    count: {
      min: 1,
      max: 3,
    },
  }),
  description: faker.lorem.paragraph({
    min: 1,
    max: 2,
  }),
  location: faker.location.state({
    abbreviated: false,
  }),
  createdBy: params.createdById,
  moderators: params?.moderators?.length
    ? [params.createdById, ...params.moderators]
    : [params.createdById],
  members: params?.members?.length
    ? [params.createdById, ...params.members]
    : [params.createdById],
  posts: params.posts || [],
});
