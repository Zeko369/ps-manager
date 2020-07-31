import React, { forwardRef } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';

const PriceField: React.ForwardRefExoticComponent<{
  register: any;
  isRequired?: boolean;
}> = forwardRef(({ isRequired, register }, ref) => {
  return (
    <FormControl ref={ref} isRequired={isRequired}>
      <FormLabel htmlFor="price">Price</FormLabel>
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
