/* istanbul ignore file */
/* AUTO-GENERATED, DO NOT EDIT THIS FILE */
/* eslint-disable */
/* @ts-nocheck */
import * as Types from '../generated/schema-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAccountsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, name: string, email: string }> };


export const GetAccountsDocument = gql`
    query GetAccounts {
  accounts {
    id
    name
    email
  }
}
    `;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export function useGetAccountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsSuspenseQueryHookResult = ReturnType<typeof useGetAccountsSuspenseQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;