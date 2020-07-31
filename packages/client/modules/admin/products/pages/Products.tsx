import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Heading, Stack, IconButton, Flex } from '@chakra-ui/core';

import { LinkIconButton, LinkButton } from '../../../../components/Link';
import { PRODUCTS_QUERY } from '../graphql/queries';
import { ProductsQuery, useDeleteProductMutation } from '../../../../generated';
import Table from '../../../../components/Table';

export const ProductsPage: React.FC = () => {
  const { loading, error, data } = useQuery<ProductsQuery>(PRODUCTS_QUERY);

  const [deleteProduct] = useDeleteProductMutation({ refetchQueries: [{ query: PRODUCTS_QUERY }] });

  const remove = useCallback(
    (id: number) => async () => {
      if (window.confirm('Are you sure?')) {
        await deleteProduct({ variables: { id } });
      }
    },
    []
  );

  return (
    <>
      <Flex justify="space-between">
        <Heading>Products:</Heading>
        <LinkButton href="products/new" variantColor="blue">
          New
        </LinkButton>
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
              <th style={{ textAlign: 'right' }}>Price (USD)</th>
              <th>Ops</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td style={{ textAlign: 'right' }}>${Math.round(product.price * 100) / 100}</td>
                <td>
                  <Stack isInline>
                    <IconButton
                      onClick={remove(product.id)}
                      icon="delete"
                      aria-label="Delete"
                      variantColor="red"
                    />
                    <LinkIconButton
                      href="/admin/products/[id]/edit"
                      as={`/admin/products/${product.id}/edit`}
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
