import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../layouts/AdminLayout';
import { SubscriptionTypesPage } from '../../../modules/admin/subscriptionTypes';

const AdminSubscriptionTypes: NextPage = () => {
  return (
    <AdminLayout>
      <SubscriptionTypesPage />
    </AdminLayout>
  );
};

export default AdminSubscriptionTypes;
