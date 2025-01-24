export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  devices: Array<Device>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Device = {
  __typename?: 'Device';
  accountId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createDevice: Device;
  deleteDevice?: Maybe<Device>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateDeviceArgs = {
  accountId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteDeviceArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  device?: Maybe<Device>;
  devices: Array<Device>;
};


export type QueryAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeviceArgs = {
  id: Scalars['ID']['input'];
};

export type GetAccountDevicesQueryVariables = Exact<{
  accountId: Scalars['ID']['input'];
}>;


export type GetAccountDevicesQuery = { __typename?: 'Query', account?: { __typename?: 'Account', devices: Array<{ __typename?: 'Device', id: string, name: string }> } | null };

export type DeleteDeviceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDeviceMutation = { __typename?: 'Mutation', deleteDevice?: { __typename?: 'Device', id: string } | null };

export type GetAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, name: string, email: string }> };

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: string, name: string, email: string } };

export type CreateDeviceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  accountId: Scalars['ID']['input'];
}>;


export type CreateDeviceMutation = { __typename?: 'Mutation', createDevice: { __typename?: 'Device', id: string, name: string } };
