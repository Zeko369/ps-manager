import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/core';

import { PRODUCTS_QUERY, PRODUCT_QUERY, UPDATE_PRODUCT } from '../graphql/queries';
import {
  ProductQuery,
  UpdateProductMutation,
  UpdateProductMutationVariables
} from '../../../../generated';
import Form, { IFormData } from '../components/Form';

const getId = (query: Record<string, string | string[]>): null | number => {
  if (query.id) {
    if (Array.isArray(query.id)) {
      return parseInt(query.id[0]);
    }

    return parseInt(query.id);
  }

  return null;
};

export const EditProductPage: React.FC = () => {
  const router = useRouter();
  const id = getId(router.query);

  const { loading, error, data } = useQuery<ProductQuery>(PRODUCT_QUERY, { variables: { id } });
  const [updateProduct] = useMutation<UpdateProductMutation, UpdateProductMutationVariables>(
    UPDATE_PRODUCT,
    {
      refetchQueries: [{ query: PRODUCTS_QUERY }]
    }
  );

  const onSubmit = async (data: IFormData) => {
    await updateProduct({ variables: { id, data: { ...data, price: parseFloat(data.price) } } });
    router.push('/dashboard/products');
  };

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return <Form onSubmit={onSubmit} initData={data.product} />;
};
