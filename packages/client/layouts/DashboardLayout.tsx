import React from 'react';
import { DashboardNavbar } from '../components/Navbar';
import { Box } from '@chakra-ui/core';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      <Box w="90%" m="0 auto" maxW="1000px" pt={3}>
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
