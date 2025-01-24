import { createStackNavigator } from '@react-navigation/stack';
import Index from '../index';
import CreateAccount from '../components/CreateAccount';
import AccountDevices from '../components/AccountDevices';
import CreateDevice from '../components/CreateDevice';
import { Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const HeaderTitle = ({ title }: { title: string }) => (
  <Text style={styles.headerTitle}>{title}</Text>
);

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Accounts">
      <Stack.Screen
        name="Accounts"
        component={Index}
        options={{
          headerTitle: () => <HeaderTitle title="Accounts" />,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerTitle: () => <HeaderTitle title="Create new account" />,
        }}
      />
      <Stack.Screen
        name="AccountDevices"
        component={AccountDevices}
        options={{
          headerTitle: () => <HeaderTitle title="Devices" />,
        }}
      />
      <Stack.Screen
        name="CreateDevice"
        component={CreateDevice}
        options={{
          headerTitle: () => <HeaderTitle title="Add new device" />,
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
