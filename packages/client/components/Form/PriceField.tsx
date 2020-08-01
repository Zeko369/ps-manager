import React, { forwardRef } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';

const PriceField: React.ForwardRefExoticComponent<{
  register: any;
  isRequired?: boolean;
  label?: string;
  w?: string;
}> = forwardRef(({ isRequired, register, label = 'Price', w }, ref) => {
  return (
    <FormControl ref={ref} isRequired={isRequired} w={w}>
      <FormLabel htmlFor="price">{label}</FormLabel>
      <Input
        name="price"
        placeholder="price"
        ref={register}
        isRequired={isRequired}
        type="number"
        step="0.01"
      />
    </FormControl>
  );
});

export default PriceField;
