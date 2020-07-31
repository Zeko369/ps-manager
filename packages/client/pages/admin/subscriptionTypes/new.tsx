import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../layouts/AdminLayout';
import { NewSubscriptionTypePage } from '../../../modules/admin/subscriptionTypes';

const AdminSubscriptionTypeNew: NextPage = () => {
  return (
    <AdminLayout>
      <NewSubscriptionTypePage />
    </AdminLayout>
  );
};

export default AdminSubscriptionTypeNew;
