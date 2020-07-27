import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../../layouts/AdminLayout';
import { EditProductPage } from '../../../../modules/admin/products';

const AdminProductEdit: NextPage = () => {
  return (
    <AdminLayout>
      <EditProductPage />
    </AdminLayout>
  );
};

export default AdminProductEdit;
