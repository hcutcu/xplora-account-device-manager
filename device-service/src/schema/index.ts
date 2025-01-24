import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Device @key(fields: "id") {
    id: ID!
    name: String!
    accountId: ID!
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    devices: [Device!]!
  }

  type Query {
    devices: [Device!]!
    device(id: ID!): Device
  }

  type Mutation {
    createDevice(name: String!, accountId: ID!): Device!
    deleteDevice(id: ID!): Device
    deleteDevicesByAccountId(accountId: ID!): [Device!]!
  }
`;
