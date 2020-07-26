import React from 'react';
import Navbar from '../components/Navbar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
