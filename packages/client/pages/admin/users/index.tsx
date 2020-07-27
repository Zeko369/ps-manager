import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../layouts/AdminLayout';
import { UsersPage } from '../../../modules/admin/users';

const AdminProducts: NextPage = () => {
  return (
    <AdminLayout>
      <UsersPage />
    </AdminLayout>
  );
};

export default AdminProducts;
