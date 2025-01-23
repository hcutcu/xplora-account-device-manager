import { Device } from './types';
import { v4 as uuidv4 } from 'uuid';

//TODO: move this later
const devices: Device[] = [
  {
    id: '1',
    name: 'iPad Pro',
    accountId: '1',
  },
  {
    id: '2',
    name: 'MacBook Pro',
    accountId: '2',
  },
];

export const resolvers = {
  Query: {
    devices: () => devices,
    devicesByAccountId: (_: any, { accountId }: { accountId: string }) =>
      devices.filter((device) => device.accountId === accountId),
  },
  Mutation: {
    createDevice: (_: any, { name, accountId }: Device) => {
      const device = { id: uuidv4(), name, accountId };
      devices.push(device);
      return device;
    },
  },
};
