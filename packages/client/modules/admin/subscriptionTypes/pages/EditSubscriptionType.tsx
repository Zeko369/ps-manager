import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Stack,
  Box,
  IconButton,
  Icon,
  BoxProps,
  useDisclosure,
  ListItem,
  List,
  Flex
} from '@chakra-ui/core';

import { useSubscriptionTypeQuery, useUpdateSubscriptionTypeMutation } from '../../../../generated';
import Form, { IFormData } from '../components/Form';
import { getId } from '../../../../helpers/getId';
import { SUBSCRIPTION_TYPES } from '../graphql/queries';
import AddSubscriptionItem from '../components/SubscriptionItem/Modal';
import { CreateSubscriptionItem, UpdateSubscriptionItem } from '../components/SubscriptionItem';

const cardProps: BoxProps = {
  borderWidth: '1px',
  borderColor: 'gray.200',
  rounded: 'lg',
  height: '150px',
  width: '250px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDir: 'column',
  position: 'relative'
};

export const EditSubscriptionTypePage: React.FC = () => {
  const disclosure = useDisclosure();
  const disclosureEdit = useDisclosure();

  const router = useRouter();
  const id = getId(router.query);

  const [updateId, setUpdateId] = useState<number>(-1);

  const { loading, error, data } = useSubscriptionTypeQuery({ variables: { id } });
  const [updateSubscriptionType] = useUpdateSubscriptionTypeMutation({
    refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  });

  const onSubmit = async (data: IFormData) => {
    const price = parseFloat(String(data.price));
    await updateSubscriptionType({ variables: { id, data: { ...data, price } } });
    router.push('/admin/subscriptionTypes');
  };

  const sum = useMemo(
    () =>
      loading || !data
        ? 0
        : data.subscriptionType.subscriptionItems.reduce(
            (all, si) =>
              all + si.subscriptionItemProducts.reduce((a, sip) => a + sip.product.price, 0),
            0
          ),
    [loading, data]
  );

  const edit = (id: number) => () => {
    setUpdateId(id);
    disclosureEdit.onOpen();
  };

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return (
    <Stack>
      <Heading>Update subscription type</Heading>
      <Form onSubmit={onSubmit} initData={{ ...data.subscriptionType, sum }}>
        <Heading fontSize="1.25em">Items</Heading>
        <Stack spacing={4} isInline>
          {data.subscriptionType.subscriptionItems.map((si, index) => (
            <Box {...cardProps} borderColor="gray.200">
              <Flex justify="space-between" pos="absolute" top="10px" left="10px" right="10px">
                <Icon name="drag-handle" aria-label="Drag" />
                <IconButton
                  icon="edit"
                  aria-label="Edit"
                  size="xs"
                  variantColor="green"
                  onClick={edit(si.id)}
                />
              </Flex>
              <Heading fontSize="1.25em" mb={3}>
                {si.name} #{index + 1}
              </Heading>
              <List styleType="disc">
                {si.subscriptionItemProducts.map((p) => (
                  <ListItem>
                    {p.product.name}
                    {p.amount !== 1 ? ` x ${p.amount}` : ''}
                  </ListItem>
                ))}
              </List>
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
      <CreateSubscriptionItem {...disclosure} subscriptionTypeId={id} />
      <UpdateSubscriptionItem {...disclosureEdit} subscriptionTypeId={id} id={updateId} />
    </Stack>
  );
};
