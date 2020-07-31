import { NextPage } from 'next';
import { Box } from '@chakra-ui/core';
import Link from '../components/Link';

const Home: NextPage = () => {
  return (
    <Box>
      <Link href="/admin">Admin</Link>
    </Box>
  );
};

export default Home;
