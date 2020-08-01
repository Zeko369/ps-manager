import React, { useState } from 'react';
import { Flex, Heading, IconButton, Stack, useDisclosure } from '@chakra-ui/core';

import { LinkIconButton, LinkButton } from '../../../../components/Link';
import { useSubscriptionTypesQuery } from '../../../../generated';
import Table from '../../../../components/Table';
import IndexModel from '../components/IndexModel';
import { formatPrice } from '../../../../helpers/formatPrice';

export const SubscriptionTypesPage: React.FC = () => {
  const [openId, setOpenId] = useState(-1);
  const { loading, error, data } = useSubscriptionTypesQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justify="space-between">
        <Heading>Subscription Types:</Heading>
        <LinkButton href="subscriptionTypes/new" variantColor="blue">
          New
        </LinkButton>
      </Flex>
      {loading ? (
        <Heading>Loading...</Heading>
      ) : error ? (
        <Heading>Error...</Heading>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Slug</th>
                <th>Name</th>
                <th style={{ textAlign: 'right', paddingRight: 50 }}>Price</th>
                <th>Ops</th>
              </tr>
            </thead>
            <tbody>
              {data.subscriptionTypes.map((st) => (
                <tr key={st.id}>
                  <td>{st.id}</td>
                  <td>{st.slug}</td>
                  <td>{st.name}</td>
                  <td style={{ textAlign: 'right', paddingRight: 50 }}>{formatPrice(st.price)}</td>
                  <td>
                    <Stack isInline>
                      <IconButton
                        icon="view"
                        aria-label="open"
                        onClick={() => {
                          setOpenId(st.id);
                          onOpen();
                        }}
                      />
                      <LinkIconButton
                        href="/admin/subscriptionTypes/[id]/edit"
                        as={`/admin/subscriptionTypes/${st.id}/edit`}
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

          <IndexModel onClose={onClose} isOpen={isOpen} data={data} id={openId} />
        </>
      )}
    </>
  );
};
