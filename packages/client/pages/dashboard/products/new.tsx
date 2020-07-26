import React from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { NewProductPage } from '../../../modules/dashboard/products';

const DashboardHome: NextPage = () => {
  return (
    <DashboardLayout>
      <NewProductPage />
    </DashboardLayout>
  );
};

export default DashboardHome;
