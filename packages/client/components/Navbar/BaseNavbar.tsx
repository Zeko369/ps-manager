import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import Link from '../Link';

export interface ILink {
  text: string;
  href: string;
}

interface BaseNavbarProps {
  links: ILink[];
  right?: React.ReactNode;
}

const BaseNavbar: React.FC<BaseNavbarProps> = ({ links, right, ...props }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <NextLink href="/admin">
          <a>
            <Heading as="h1" size="lg" cursor="pointer">
              Admin
            </Heading>
          </a>
        </NextLink>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {links.map((link) => (
          <Link
            key={`${link.text} ${link.href}`}
            href={link.href}
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
          >
            {link.text}
          </Link>
        ))}
      </Box>

      <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        {right}
      </Box>
    </Flex>
  );
};

export default BaseNavbar;
