import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    accounts: [Account!]!
    account(id: ID!): Account
  }

  type Mutation {
    createAccount(name: String!, email: String!): Account!
    deleteAccount(id: ID!): Account
  }
`;
