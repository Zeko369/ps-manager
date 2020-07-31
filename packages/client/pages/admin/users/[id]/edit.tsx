import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../../layouts/AdminLayout';
import { EditUserPage } from '../../../../modules/admin/users';

const AdminProductEdit: NextPage = () => {
  return (
    <AdminLayout>
      <EditUserPage />
    </AdminLayout>
  );
};

export default AdminProductEdit;
