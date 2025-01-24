import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUrl =
  Constants.expoConfig?.extra?.apiUrl?.[Platform.OS] || 'http://localhost:4000';

const client = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
