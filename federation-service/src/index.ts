import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { services } from './services';

async function startGateway() {
  // Initialize Apollo Gateway
  const gateway = new ApolloGateway({
    serviceList: services,
  });

  const server = new ApolloServer({
    gateway,
  });

  // Start the server
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Federation Gateway ready at ${url}`);
  });
}

startGateway().catch((err) => {
  console.error('Failed to start the federation gateway', err);
});
