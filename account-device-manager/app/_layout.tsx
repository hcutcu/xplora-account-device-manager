import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import client from './clients/apolloClient';
import Navigation from './components/Navigation';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}

