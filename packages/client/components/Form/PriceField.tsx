import React, { forwardRef } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';

const PriceField: React.ForwardRefExoticComponent<{
  register: any;
  isRequired?: boolean;
  label?: string;
}> = forwardRef(({ isRequired, register, label = 'Price' }, ref) => {
  return (
    <FormControl ref={ref} isRequired={isRequired}>
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
