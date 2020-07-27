import React from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Heading } from '@chakra-ui/core';
import PrivateRoute from '../../router/PrivateRoute';

const DashboardHome: NextPage = () => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        <Heading>Dashboard home</Heading>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default DashboardHome;
