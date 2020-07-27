import React from 'react';
import { NextPage } from 'next';

import DashboardLayout from '../../../../layouts/DashboardLayout';
import { EditProductPage } from '../../../../modules/admin/products';

const DashboardProductEdit: NextPage = () => {
  return (
    <DashboardLayout>
      <EditProductPage />
    </DashboardLayout>
  );
};

export default DashboardProductEdit;
