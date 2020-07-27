import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/core';
import { useMutation, ApolloError } from '@apollo/client';

import { ME, SIGN_IN } from '../graphql/queries';
import {
  SignInMutation,
  SignInMutationVariables,
  useMeQuery,
  useMeLazyQuery
} from '../../../generated';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<SignInForm>();

  const { loading, error, data } = useMeQuery();
  const [query] = useMeLazyQuery();
  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN);

  const onSubmit = async (data: SignInForm): Promise<void> => {
    try {
      const res = await signIn({ variables: data });
      console.log(res);
    } catch (err) {
      const error = err as ApolloError;
      console.error(error.message);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  if (data.me) return <h1>Already logged in</h1>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button onClick={() => query()}>Click</Button>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          placeholder="email"
          ref={register({ required: true })}
          isRequired
          type="email"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          placeholder="password"
          ref={register({ required: true })}
          isRequired
          type="password"
        />
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
