import { createSchema, createYoga } from 'graphql-yoga';
import { Database } from './classes/Database';
import schema from './schema';
import { Query } from './queries';
import { Mutation } from './mutation';

new Database().start();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: {
      Query,
      Mutation,
    },
  }),
});

const init = () => {
  const server = Bun.serve({
    fetch: yoga,
    port: 4000,
  });

  console.info(
    `Server is running on ${new URL(
      yoga.graphqlEndpoint,
      `http://${server.hostname}:${server.port}`
    )}`
  );
};

init();
