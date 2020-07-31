import React from 'react';
import { useRouter } from 'next/router';
import { Heading, Stack, Box, IconButton, Icon, BoxProps, useDisclosure } from '@chakra-ui/core';

import { useSubscriptionTypeQuery, useUpdateSubscriptionTypeMutation } from '../../../../generated';
import Form, { IFormData } from '../components/Form';
import { getId } from '../../../../helpers/getId';
import { SUBSCRIPTION_TYPES } from '../graphql/queries';
import AddSubscriptionItem from '../components/AddSubscriptionItem';

const cardProps: BoxProps = {
  borderWidth: '1px',
  borderColor: 'gray.200',
  rounded: 'lg',
  size: '150px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  position: 'relative'
};

export const EditSubscriptionTypePage: React.FC = () => {
  const disclosure = useDisclosure();

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
      <Form onSubmit={onSubmit} initData={data.subscriptionType}>
        <Heading fontSize="1.25em">Items</Heading>

        <Stack spacing={4} isInline>
          {data.subscriptionType.subscriptionItems.map((si) => (
            <Box {...cardProps} borderColor="gray.200">
              <Box pos="absolute" top="10px" left="10px" cursor="pointer">
                <Icon name="drag-handle" aria-label="Drag" />
              </Box>
              {si.product.name}
            </Box>
          ))}
          <Box {...cardProps} borderColor="gray.100">
            <IconButton
              icon="add"
              aria-label="Add new"
              rounded="full"
              size="lg"
              variantColor="blue"
              onClick={disclosure.onOpen}
            />
          </Box>
        </Stack>
      </Form>
      <AddSubscriptionItem {...disclosure} />
    </Stack>
  );
};