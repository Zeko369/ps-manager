import React from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ProductsPage } from '../../../modules/dashboard/products';

const DashboardProducts: NextPage = () => {
  return (
    <DashboardLayout>
      <ProductsPage />
    </DashboardLayout>
  );
};

export default DashboardProducts;
