import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Stack, Box } from '@chakra-ui/core';
import PriceField from '../../../../components/Form/PriceField';

export interface IFormData {
  name: string;
  price: string | number;
  id?: number;
}

interface IFormProps {
  onSubmit: (data: IFormData) => Promise<void>;
  initData?: IFormData;
}

const Form: React.FC<IFormProps> = ({ onSubmit, initData }) => {
  const { register, handleSubmit, formState } = useForm<IFormData>({ defaultValues: initData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input name="name" placeholder="name" ref={register} isRequired />
        </FormControl>
        <Box>
          <PriceField register={register} />
        </Box>
        <Button variantColor="teal" isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
