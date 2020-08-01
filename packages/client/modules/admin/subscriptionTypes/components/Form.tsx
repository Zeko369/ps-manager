import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  SimpleGrid,
  Box
} from '@chakra-ui/core';
import PriceField from '../../../../components/Form/PriceField';

export interface IFormData {
  name: string;
  slug: string;
  amount: number;
  price?: number;
  sum?: number;
}

interface IFormProps {
  onSubmit: (data: IFormData) => Promise<void>;
  initData?: IFormData;
  children: ({ amount }: { amount: number | string }) => React.ReactElement;
}

const Form: React.FC<IFormProps> = ({ onSubmit, initData, children }) => {
  const update = Boolean(initData);
  const { register, handleSubmit, formState, watch } = useForm<IFormData>({
    defaultValues: initData
  });

  const amount = watch('amount');

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
          <SimpleGrid columns={2} spacing={10}>
            <PriceField
              register={register}
              label={
                initData.sum ? `Price: (Combined: ${initData.sum * (amount || 1)})` : undefined
              }
            />
            <FormControl>
              <FormLabel htmlFor="amount">
                <Text>
                  Amount{' '}
                  <Text color="gray.400" d="inline">
                    (Multiplier of how many copies of items)
                  </Text>
                </Text>
              </FormLabel>
              <Input name="amount" placeholder="amount" ref={register} isRequired />
            </FormControl>
          </SimpleGrid>
        )}
        <Box>{children({ amount })}</Box>
        <Button variantColor="teal" isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
