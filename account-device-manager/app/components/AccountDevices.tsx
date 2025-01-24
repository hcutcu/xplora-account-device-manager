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
  Linking,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import {
  RouteProp,
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { GetAccountDevicesQuery, DeleteDeviceMutation } from '@/graphql/gateway/generated/schema-types';

const GET_ACCOUNT_DEVICES = gql`
  query GetAccountDevices($accountId: ID!) {
    account(id: $accountId) {
      devices {
        id
        name
        link
      }
    }
  }
`;

const DELETE_DEVICE = gql`
  mutation DeleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      id
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

  const [deleteDevice] = useMutation<DeleteDeviceMutation>(DELETE_DEVICE, {
    onCompleted: () => refetch(),
  });

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

  const handleDeleteDevice = (id: string) => {
    deleteDevice({ variables: { id } });
  };

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{item.name}</Text>
              {item.link ? (
                <TouchableOpacity onPress={() => handleOpenLink(item.link!)}>
                  <Text style={styles.deviceLink}>{item.link}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.noLink}>No link</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteDevice(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
  deviceCard: {
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
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
  },
  deviceLink: {
    fontSize: 14,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  noLink: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
  noDevices: {
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