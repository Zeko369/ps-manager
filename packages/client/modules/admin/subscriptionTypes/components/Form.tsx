import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Stack, Box } from '@chakra-ui/core';
import PriceField from '../../../../components/Form/PriceField';

export interface IFormData {
  name: string;
  slug: string;
  price?: number;
}

interface IFormProps {
  onSubmit: (data: IFormData) => Promise<void>;
  initData?: IFormData;
}

const Form: React.FC<IFormProps> = ({ onSubmit, initData }) => {
  const update = Boolean(initData);
  const { register, handleSubmit, formState } = useForm<IFormData>({ defaultValues: initData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input name="name" placeholder="name" ref={register} isRequired />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input name="slug" placeholder="slug" ref={register} isRequired />
        </FormControl>
        {update && (
          <Stack spacing={3}>
            <PriceField register={register} />
          </Stack>
        )}
        <Button variantColor="teal" isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
