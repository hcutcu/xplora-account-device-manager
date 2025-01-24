import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '@/graphql/gateway/generated/schema-types';

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function CreateAccount() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createAccount, { loading, error }] =
    useMutation<CreateAccountMutation>(CREATE_ACCOUNT, {
      onCompleted: () => navigation.goBack(),
    });

  const handleCreateAccount = () => {
    createAccount({ variables: { name, email } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Create Account" onPress={handleCreateAccount} />
      {loading && <Text>Creating account...</Text>}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
