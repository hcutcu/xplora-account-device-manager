import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetAccountsQuery } from '@/graphql/gateway/generated/schema-types';
import { NavigationProp } from '../types/navigation';

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      email
    }
  }
`;

export default function Accounts() {
  const navigation = useNavigation<NavigationProp>();
  const { loading, error, data, refetch } = useQuery<GetAccountsQuery>(GET_ACCOUNTS);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
      <FlatList
        data={data?.accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.accountCard}
            onPress={() => navigation.navigate('AccountDevices', { accountId: item.id })}
          >
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.accountEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noAccounts}>No accounts found</Text>}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Create New Account"
          onPress={() => navigation.navigate('CreateAccount')}
        />
      </View>
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
  noAccounts: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for the button
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});