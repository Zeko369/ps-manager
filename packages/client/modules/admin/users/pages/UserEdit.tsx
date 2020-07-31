import React from 'react';
import { useRouter } from 'next/router';
import { Heading, Stack } from '@chakra-ui/core';

import { useUserQuery, useUpdateUserMutation } from '../../../../generated';
import Form, { IFormData } from '../components/Form';
import { USERS } from '../graphql/queries';
import { getId } from '../../../../helpers/getId';

export const EditUserPage: React.FC = () => {
  const router = useRouter();
  const id = getId(router.query);

  const { loading, error, data } = useUserQuery({ variables: { id } });
  const [updateUser] = useUpdateUserMutation({ refetchQueries: [{ query: USERS }] });

  const onSubmit = async (data: IFormData) => {
    await updateUser({ variables: { id, data } });
    router.push('/admin/users');
  };

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return (
    <Stack>
      <Heading>Edit user: [{data.user.name}]</Heading>
      <Form onSubmit={onSubmit} initData={data.user} />
    </Stack>
  );
};
