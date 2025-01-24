import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Index: undefined;
  CreateAccount: undefined;
  AccountDevices: { accountId: string };
  CreateDevice: { accountId: string };
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
