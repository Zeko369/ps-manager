import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { CREATE_PRODUCT, PRODUCTS_QUERY } from '../graphql/queries';

import { CreateProductMutation, CreateProductMutationVariables } from '../../../../graphql';
import Form, { IFormData } from '../components/Form';

export const NewProductPage: React.FC = () => {
  const router = useRouter();

  const [createProduct] = useMutation<CreateProductMutation, CreateProductMutationVariables>(
    CREATE_PRODUCT,
    {
      refetchQueries: [{ query: PRODUCTS_QUERY }]
    }
  );

  const onSubmit = async (data: IFormData) => {
    await createProduct({ variables: { ...data, price: parseFloat(data.price) } });
    router.push('/dashboard/products');
  };

  return <Form onSubmit={onSubmit} />;
};
