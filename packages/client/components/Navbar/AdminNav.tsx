import React from 'react';
import BaseNavbar, { ILink } from './BaseNavbar';
import { Stack, Avatar, Button } from '@chakra-ui/core';
import { useMeQuery, useSignOutMutation } from '../../generated';
import { useRouter } from 'next/router';
import { ME } from '../../modules/auth/graphql/queries';

const links: ILink[] = [
  { text: 'Products', href: '/admin/products' },
  { text: 'Users', href: '/admin/users' }
];

export const AdminNavbar: React.FC = () => {
  const router = useRouter();
  const { data } = useMeQuery();
  const [signOut] = useSignOutMutation({ refetchQueries: [{ query: ME }] });

  const onClick = () => {
    signOut().then(() => router.push('/'));
  };

  return (
    <BaseNavbar
      links={links}
      right={
        <Stack isInline alignItems="center">
          <Button variantColor="red" onClick={onClick}>
            Logout
          </Button>
          <Avatar name={data?.me?.name} />
        </Stack>
      }
    />
  );
};
