import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading, List, ListItem, Flex, Button } from '@chakra-ui/core';

import Link from '../../../../components/Link';
import { PRODUCTS_QUERY } from '../graphql/queries';
import { ProductsQuery } from '../../../../generated';

export const ProductsPage: React.FC = () => {
  const { loading, error, data } = useQuery<ProductsQuery>(PRODUCTS_QUERY);

  return (
    <>
      <Flex justify="space-between">
        <Heading>Products:</Heading>
        <Link href="products/new">
          <Button variantColor="blue">New</Button>
        </Link>
      </Flex>
      {loading ? (
        <Heading>Loading...</Heading>
      ) : error ? (
        <Heading>Error...</Heading>
      ) : (
        <List styleType="disc">
          {data.products.map((product) => (
            <ListItem key={product.id}>
              <Link
                href="/dashboard/products/[id]/edit"
                as={`/dashboard/products/${product.id}/edit`}
              >
                <a>{`${product.name} -> $${product.price}`}</a>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
