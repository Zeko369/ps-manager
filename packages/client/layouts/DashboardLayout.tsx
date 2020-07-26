import React from 'react';
import { DashboardNavbar } from '../components/Navbar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
};

export default DashboardLayout;
