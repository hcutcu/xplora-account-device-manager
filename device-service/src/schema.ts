import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Device @key(fields: "id") {
    id: ID!
    name: String!
    accountId: ID!
  }

  type Query {
    devices: [Device!]!
    devicesByAccountId(accountId: ID!): [Device!]!
  }

  type Mutation {
    createDevice(name: String!, accountId: ID!): Device!
  }
`;
