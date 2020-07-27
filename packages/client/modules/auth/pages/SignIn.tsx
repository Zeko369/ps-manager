import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/core';
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { ME, SIGN_IN } from '../graphql/queries';
import { MeQuery, SignInMutation, SignInMutationVariables } from 'client/generated';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<SignInForm>();

  const { loading, error, data } = useQuery<MeQuery>(ME);
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

  return (
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
  );
};
