import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../layouts/AdminLayout';
import { NewProductPage } from '../../../modules/admin/products';

const AdminProductNew: NextPage = () => {
  return (
    <AdminLayout>
      <NewProductPage />
    </AdminLayout>
  );
};

export default AdminProductNew;
