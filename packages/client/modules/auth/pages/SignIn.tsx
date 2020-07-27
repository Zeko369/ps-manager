import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/core';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';

import { ME } from '../graphql/queries';
import { useMeQuery, useSignInMutation } from '../../../generated';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useMeQuery();
  const { register, handleSubmit, formState } = useForm<SignInForm>();

  const [signIn] = useSignInMutation({ refetchQueries: [{ query: ME }] });

  useEffect(() => {
    if (!loading && !error && data.me) {
      router.push('/admin');
    }
  }, [loading, error, data]);

  const onSubmit = async (data: SignInForm): Promise<void> => {
    try {
      await signIn({ variables: data });
      router.push('/admin');
    } catch (err) {
      const error = err as ApolloError;
      console.error(error.message);
    }
  };

  return (
    <Box w="90%" maxW="1000px" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </Box>
  );
};
