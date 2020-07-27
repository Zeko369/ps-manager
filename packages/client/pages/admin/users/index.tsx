import React from 'react';
import { NextPage } from 'next';

import DashboardLayout from '../../../layouts/DashboardLayout';
import { UsersPage } from '../../../modules/admin/users';

const DashboardProducts: NextPage = () => {
  return (
    <DashboardLayout>
      <UsersPage />
    </DashboardLayout>
  );
};

export default DashboardProducts;
