import { Device } from './types';
import { v4 as uuidv4 } from 'uuid';

//TODO: Decide later if default devices should be removed
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
    device: (_: unknown, { id }: { id: string }) => {
      return devices.find((device) => device.id === id) || null;
    },
  },
  Mutation: {
    createDevice: (_: any, { name, accountId }: Device) => {
      const device = { id: uuidv4(), name, accountId };
      devices.push(device);
      return device;
    },
    deleteDevice: (_: any, { id }: { id: string }) => {
      const index = devices.findIndex((device) => device.id === id);
      if (index !== -1) {
        return devices.splice(index, 1)[0];
      }
      return null;
    },
  },
  Account: {
    devices: (account: { id: string }) =>
      devices.filter((device) => device.accountId === account.id),
  },
  Device: {
    __resolveReference(device: { id: string }) {
      return devices.find((d) => d.id === device.id) || null;
    },
  },
};
