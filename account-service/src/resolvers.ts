import { Account } from './types';

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
      const account = { id: String(accounts.length + 1), name, email };
      accounts.push(account);
      return account;
    },
  },
};
