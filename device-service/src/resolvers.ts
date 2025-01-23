import { Device } from './types';
import { v4 as uuidv4 } from 'uuid';

//TODO: move this later
const devices: Device[] = [
  {
    id: '1',
    name: 'iPad Pro',
  },
  {
    id: '2',
    name: 'MacBook Pro',
  },
];

export const resolvers = {
  Query: {
    devices: () => devices,
  },
  Mutation: {
    createDevice: (_: any, { name }: Device) => {
      const device = { id: uuidv4(), name };
      devices.push(device);
      return device;
    },
  },
};
