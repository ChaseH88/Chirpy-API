import { faker } from "@faker-js/faker";

const photoOptions = [
  "earth",
  "smile",
  "snowflake",
  "football",
  "basketball",
  "racing",
  "airplane",
  "hiking",
  "person",
];

type UserFakerParams = {
  posts?: string[];
  groups?: string[];
  username?: string;
  password?: string;
  email?: string;
};

export const userFaker = (params?: UserFakerParams) => ({
  _id: faker.database.mongodbObjectId(),
  email: params?.email || faker.internet.email(),
  password: params?.password || faker.internet.password(),
  username: params?.username || faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  bio: faker.lorem.paragraph(),
  photo: faker.helpers.arrayElement(photoOptions),
  posts: params?.posts || [],
  groups: params?.groups || [],
});
