import React from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Heading } from '@chakra-ui/core';

const DashboardHome: NextPage = () => {
  return (
    <DashboardLayout>
      <Heading>Dashboard home</Heading>
    </DashboardLayout>
  );
};

export default DashboardHome;
