import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

export interface IFormData {
  name: string;
  slug: string;
}

interface IFormProps {
  onSubmit: (data: IFormData) => Promise<void>;
  initData?: IFormData;
}

const Form: React.FC<IFormProps> = ({ onSubmit, initData }) => {
  const { register, handleSubmit, formState } = useForm<IFormData>({ defaultValues: initData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input name="name" placeholder="name" ref={register} isRequired />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <Input name="slug" placeholder="slug" ref={register} isRequired />
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
