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
import { getId } from '../../../../helpers/getId';

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
    const price = parseFloat(String(data.price));
    await updateProduct({ variables: { id, data: { ...data, price } } });
    router.push('/admin/products');
  };

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error...</Heading>;

  return <Form onSubmit={onSubmit} initData={data.product} />;
};
