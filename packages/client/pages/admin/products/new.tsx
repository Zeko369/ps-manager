import React from 'react';
import { NextPage } from 'next';

import DashboardLayout from '../../../layouts/DashboardLayout';
import { NewProductPage } from '../../../modules/admin/products';

const DashboardProductNew: NextPage = () => {
  return (
    <DashboardLayout>
      <NewProductPage />
    </DashboardLayout>
  );
};

export default DashboardProductNew;
