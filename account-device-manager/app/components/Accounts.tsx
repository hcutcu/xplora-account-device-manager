import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetAccountsQuery, DeleteAccountMutation, DeleteDevicesByAccountIdMutation } from '@/graphql/gateway/generated/schema-types';
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

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;

const DELETE_DEVICES_BY_ACCOUNT_ID = gql`
  mutation DeleteDevicesByAccountId($accountId: ID!) {
    deleteDevicesByAccountId(accountId: $accountId) {
      id
    }
  }
`;

export default function Accounts() {
  const navigation = useNavigation<NavigationProp>();
  const { loading, error, data, refetch } = useQuery<GetAccountsQuery>(GET_ACCOUNTS);
  const [deleteAccount] = useMutation<DeleteAccountMutation>(DELETE_ACCOUNT, {
    onCompleted: () => refetch(),
  });
  const [deleteDevicesByAccountId] = useMutation<DeleteDevicesByAccountIdMutation>(DELETE_DEVICES_BY_ACCOUNT_ID);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleDeleteAccount = (accountId: string) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure? All related devices will be deleted as well.');
      if (confirmed) {
        deleteDevicesByAccountId({ variables: { accountId } });
        deleteAccount({ variables: { id: accountId } });
      }
    } else {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure? All related devices will be deleted as well.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteDevicesByAccountId({ variables: { accountId } });
              await deleteAccount({ variables: { id: accountId } });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

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
          <View style={styles.accountCard}>
            <TouchableOpacity
              style={styles.accountInfo}
              onPress={() => navigation.navigate('AccountDevices', { accountId: item.id })}
            >
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.accountEmail}>{item.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteAccount(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
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
  accountCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '600',
  },
  accountEmail: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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