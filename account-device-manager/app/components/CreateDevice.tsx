import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { useCreateDeviceMutation } from '@/graphql/gateway/hooks/createDevice.hooks';

type CreateDeviceRouteProp = RouteProp<
  { CreateDevice: { accountId: string } },
  'CreateDevice'
>;

export default function CreateDevice() {
  const route = useRoute<CreateDeviceRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { accountId } = route.params;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [createDevice, { loading, error }] = useCreateDeviceMutation({
    onCompleted: () => navigation.goBack(),
  });

  const handleCreateDevice = () => {
    createDevice({ variables: { name, accountId, link } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Device Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Device Link"
        value={link}
        onChangeText={setLink}
      />
      <Button title="Create Device" onPress={handleCreateDevice} />
      {loading && <Text>Creating device...</Text>}
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
