import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/federation';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const schemaDefinition = { typeDefs, resolvers };

const server = new ApolloServer({
  schema: buildSubgraphSchema([schemaDefinition]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Device Server ready at ${url}`);
});
