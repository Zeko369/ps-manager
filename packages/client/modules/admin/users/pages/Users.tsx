import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Flex, Heading, IconButton, Stack } from '@chakra-ui/core';

import { LinkIconButton } from '../../../../components/Link';
import { USERS } from '../graphql/queries';
import { UsersQuery, useDeleteUserMutation } from '../../../../generated';
import Table from '../../../../components/Table';

export const UsersPage: React.FC = () => {
  const { loading, error, data } = useQuery<UsersQuery>(USERS);
  const [deleteUser] = useDeleteUserMutation({ refetchQueries: [{ query: USERS }] });

  const remove = useCallback(
    (id: number) => async () => {
      if (window.confirm('Are you sure?')) {
        await deleteUser({ variables: { id } });
      }
    },
    []
  );

  return (
    <>
      <Flex justify="space-between">
        <Heading>Users:</Heading>
      </Flex>
      {loading ? (
        <Heading>Loading...</Heading>
      ) : error ? (
        <Heading>Error...</Heading>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Ops</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <Stack isInline>
                    <IconButton
                      onClick={remove(user.id)}
                      icon="delete"
                      aria-label="Delete"
                      variantColor="red"
                    />
                    <LinkIconButton
                      href="/admin/users/[id]/edit"
                      as={`/admin/users/${user.id}/edit`}
                      icon="edit"
                      aria-label="Edit"
                      variantColor="green"
                    />
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
