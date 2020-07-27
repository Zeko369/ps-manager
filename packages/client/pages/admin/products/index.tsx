import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../layouts/AdminLayout';
import { ProductsPage } from '../../../modules/admin/products';

const AdminProducts: NextPage = () => {
  return (
    <AdminLayout>
      <ProductsPage />
    </AdminLayout>
  );
};

export default AdminProducts;
