import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import client from './clients/apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
