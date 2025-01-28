/* istanbul ignore file */
/* AUTO-GENERATED, DO NOT EDIT THIS FILE */
/* eslint-disable */
/* @ts-nocheck */
import * as Types from '../generated/schema-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteDeviceMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteDeviceMutation = { __typename?: 'Mutation', deleteDevice?: { __typename?: 'Device', id: string } | null };


export const DeleteDeviceDocument = gql`
    mutation DeleteDevice($id: ID!) {
  deleteDevice(id: $id) {
    id
  }
}
    `;
export type DeleteDeviceMutationFn = Apollo.MutationFunction<DeleteDeviceMutation, DeleteDeviceMutationVariables>;

/**
 * __useDeleteDeviceMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceMutation, { data, loading, error }] = useDeleteDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeviceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeviceMutation, DeleteDeviceMutationVariables>(DeleteDeviceDocument, options);
      }
export type DeleteDeviceMutationHookResult = ReturnType<typeof useDeleteDeviceMutation>;
export type DeleteDeviceMutationResult = Apollo.MutationResult<DeleteDeviceMutation>;
export type DeleteDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>;