import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import {
  RouteProp,
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { GetAccountDevicesQuery } from '@/graphql/gateway/generated/schema-types';

const GET_ACCOUNT_DEVICES = gql`
  query GetAccountDevices($accountId: ID!) {
    account(id: $accountId) {
      devices {
        id
        name
      }
    }
  }
`;

type AccountDevicesRouteProp = RouteProp<
  { AccountDevices: { accountId: string } },
  'AccountDevices'
>;

export default function AccountDevices() {
  const route = useRoute<AccountDevicesRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { accountId } = route.params;
  const { loading, error, data, refetch } = useQuery<GetAccountDevicesQuery>(
    GET_ACCOUNT_DEVICES,
    {
      variables: { accountId },
    }
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading devices...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          Error fetching devices: {error.message}
        </Text>
      </View>
    );
  }

  const devices = data?.account?.devices;

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noDevices}>No devices found</Text>}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Device"
          onPress={() => navigation.navigate('CreateDevice', { accountId })}
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
  deviceCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
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
  noDevices: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});