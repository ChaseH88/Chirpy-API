import { createSchema, createYoga } from 'graphql-yoga';
import { Database } from './classes/Database';
import { UserModel } from './models/user';

new Database().start();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        allUsers: [User!]!
      }

      type Mutation {
        createUser(data: CreateUserInput!): User!
      }
      
      input CreateUserInput {
        username: String!
        password: String!
        email: String!
      }

      type User {
        id: ID!
        username: String!
        password: String!
        email: String!
      }

      type Post {
        id: ID!
        postedBy: User!
        content: String!
        likes: [User!]!
        dislikes: [User!]!
        comments: [Comment!]!
      }

      type Comment {
        id: ID!
        user: User!
        comment: String!
        createdAt: Date!
        updatedAt: Date!
      }

      scalar Date
    `,
    resolvers: {
      Query: {
        allUsers: async () => await UserModel.find(),
      },
      Mutation: {
        createUser: async (_, args) => {
          const user = new UserModel(args.data);
          await user.save();
          return user;
        },
      },
    },
  }),
});

const server = Bun.serve({
  fetch: yoga,
});

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
);
