import React from 'react';
import { Box } from '@chakra-ui/core';
import { AdminNavbar } from '../components/Navbar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <Box w="90%" m="0 auto" maxW="1000px" pt={3}>
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
