import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { Heading, List, ListItem } from '@chakra-ui/core';

import { PRODUCTS_QUERY } from '../graphql/queries';
import { ProductsQuery } from '../../../../graphql';

export const ProductsPage: NextPage = () => {
  const { loading, error, data } = useQuery<ProductsQuery>(PRODUCTS_QUERY);

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return (
    <List styleType="disc">
      {data.products.map((product) => (
        <ListItem key={product.id}>{product.name}</ListItem>
      ))}
    </List>
  );
};
