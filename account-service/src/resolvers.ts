import { Account } from './types';
import { v4 as uuidv4 } from 'uuid';

const accounts: Account[] = [
  {
    id: '1',
    name: 'Hasan Cutcu',
    email: 'hasancutcu@gmail.com',
  },
  {
    id: '2',
    name: 'Raptiye rap rap',
    email: 'rrr@gmail.com',
  },
];

export const resolvers = {
  Query: {
    accounts: () => accounts,
    account: (_: any, { id }: { id: string }) =>
      accounts.find((account) => account.id === id),
  },
  Mutation: {
    createAccount: (_: any, { name, email }: Account) => {
      const account = { id: uuidv4(), name, email };
      accounts.push(account);
      return account;
    },
    deleteAccount: (_: any, { id }: { id: string }) => {
      const index = accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        return accounts.splice(index, 1)[0];
      }
      return null;
    },
  },
  Account: {
    __resolveReference(account: Account) {
      return accounts.find((acc) => acc.id === account.id) || null;
    },
  },
};
