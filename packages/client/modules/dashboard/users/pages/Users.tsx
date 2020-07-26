import React from 'react';
import { useQuery } from '@apollo/client';
import { USERS } from '../graphql/queries';
import { Flex, Heading, List, ListItem } from '@chakra-ui/core';

import { UsersQuery } from '../../../../graphql';

export const UsersPage: React.FC = () => {
  const { loading, error, data } = useQuery<UsersQuery>(USERS);

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
        <List styleType="disc">
          {data.users.map((user) => (
            <ListItem key={user.id}>
              {user.name} [{user.role}]
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
