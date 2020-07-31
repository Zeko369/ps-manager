import React from 'react';
import { useRouter } from 'next/router';
import { Heading, Stack } from '@chakra-ui/core';

import { useSubscriptionTypeQuery, useUpdateSubscriptionTypeMutation } from '../../../../generated';
import Form, { IFormData } from '../components/Form';
import { getId } from '../../../../helpers/getId';
import { SUBSCRIPTION_TYPES } from '../graphql/queries';

export const EditSubscriptionTypePage: React.FC = () => {
  const router = useRouter();
  const id = getId(router.query);

  const { loading, error, data } = useSubscriptionTypeQuery({ variables: { id } });
  const [updateSubscriptionType] = useUpdateSubscriptionTypeMutation({
    refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  });

  const onSubmit = async (data: IFormData) => {
    const price = parseFloat(String(data.price));
    await updateSubscriptionType({ variables: { id, data: { ...data, price } } });
    router.push('/admin/subscriptionTypes');
  };

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return (
    <Stack>
      <Heading>Update subscription type</Heading>
      <Form onSubmit={onSubmit} initData={data.subscriptionType} />
    </Stack>
  );
};
