import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, FormLabel, Select, Button } from '@chakra-ui/core';
import { Role } from '../../../../generated';

export interface IFormData {
  role: Role;
}

interface IFormProps {
  onSubmit: (data: IFormData) => Promise<void>;
  initData?: IFormData;
}

const Form: React.FC<IFormProps> = ({ onSubmit, initData }) => {
  const { handleSubmit, formState, register } = useForm<IFormData>({
    defaultValues: initData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="role">Role</FormLabel>
        <Select name="role" ref={register} placeholder="Select role" isRequired>
          {Object.keys(Role).map((role) => (
            <option value={Role[role]} key={role}>
              {role}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
