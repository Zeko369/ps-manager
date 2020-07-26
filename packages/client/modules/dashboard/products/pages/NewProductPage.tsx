import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/core';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, PRODUCTS_QUERY } from '../graphql/queries';
import { CreateProductMutation, CreateProductInputs } from '../../../../graphql';
import { useRouter } from 'next/dist/client/router';

interface FormData {
  name: string;
  price: string;
}

export const NewProductPage: React.FC = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>();
  const [createProduct] = useMutation<CreateProductMutation, CreateProductInputs>(CREATE_PRODUCT, {
    refetchQueries: [{ query: PRODUCTS_QUERY }]
  });

  const onSubmit = async (data: FormData) => {
    await createProduct({ variables: { ...data, price: parseInt(data.price) } });
    router.push('/dashboard/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input name="name" placeholder="name" ref={register} isRequired />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input
          name="price"
          placeholder="price"
          ref={register}
          isRequired
          type="number"
          step="0.01"
        />
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
