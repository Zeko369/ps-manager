import React from 'react';
import { NextPage } from 'next';
import { Heading } from '@chakra-ui/core';
import AdminLayout from '../../layouts/AdminLayout';
import PrivateRoute from '../../router/PrivateRoute';

const AdminHome: NextPage = () => {
  return (
    <PrivateRoute>
      <AdminLayout>
        <Heading>Admin home</Heading>
      </AdminLayout>
    </PrivateRoute>
  );
};

export default AdminHome;
