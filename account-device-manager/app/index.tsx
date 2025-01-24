import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { GetAccountsQuery } from '@/graphql/gateway/generated/schema-types';

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      email
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery<GetAccountsQuery>(GET_ACCOUNTS);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading accounts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          Error fetching accounts: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <FlatList
        data={data?.accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountCard}>
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.accountEmail}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accountCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '600',
  },
  accountEmail: {
    fontSize: 14,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
