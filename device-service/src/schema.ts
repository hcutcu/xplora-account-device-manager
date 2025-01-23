import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Device @key(fields: "id") {
    id: ID!
    name: String!
  }

  type Query {
    devices: [Device!]!
  }

  type Mutation {
    createDevice(name: String!): Device!
  }
`;
