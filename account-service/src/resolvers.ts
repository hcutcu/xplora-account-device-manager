import { Account } from './types';
import { v4 as uuidv4 } from 'uuid';

//TODO: move this later
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
  },
  Mutation: {
    createAccount: (_: any, { name, email }: Account) => {
      const account = { id: uuidv4(), name, email };
      accounts.push(account);
      return account;
    },
  },
};
