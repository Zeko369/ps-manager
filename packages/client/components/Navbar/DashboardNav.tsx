import React from 'react';
import BaseNavbar, { ILink } from './BaseNavbar';

const links: ILink[] = [{ text: 'Products', href: '/dashboard/products' }];

export const DashboardNavbar: React.FC = () => {
  return <BaseNavbar links={links} />;
};
