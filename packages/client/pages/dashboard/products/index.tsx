import React from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ProductsPage } from '../../../modules/dashboard/products';

const DashboardHome: NextPage = () => {
  return (
    <DashboardLayout>
      <ProductsPage />
    </DashboardLayout>
  );
};

export default DashboardHome;
