import React from 'react';
import { NextPage } from 'next';

import AdminLayout from '../../../../layouts/AdminLayout';
import { EditSubscriptionTypePage } from '../../../../modules/admin/subscriptionTypes';

const AdminSubscriptionTypeEdit: NextPage = () => {
  return (
    <AdminLayout>
      <EditSubscriptionTypePage />
    </AdminLayout>
  );
};

export default AdminSubscriptionTypeEdit;
