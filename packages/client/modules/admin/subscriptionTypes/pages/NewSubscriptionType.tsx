import React from 'react';
import { useRouter } from 'next/dist/client/router';

import { useCreateSubscriptionTypeMutation } from '../../../../generated';
import { SUBSCRIPTION_TYPES } from '../graphql/queries';
import Form, { IFormData } from '../components/Form';
import { Stack, Heading } from '@chakra-ui/core';

export const NewSubscriptionTypePage: React.FC = () => {
  const router = useRouter();

  const [createSubscriptionType] = useCreateSubscriptionTypeMutation({
    refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  });

  const onSubmit = async (data: IFormData) => {
    const res = await createSubscriptionType({ variables: { ...data } });
    router.push(`/admin/subscriptionTypes/${res.data.createSubscriptionType.id}/edit`);
  };

  return (
    <Stack>
      <Heading>Create new subscription type</Heading>
      <Form onSubmit={onSubmit} />
    </Stack>
  );
};
