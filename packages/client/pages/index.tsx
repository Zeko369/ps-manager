import { NextPage } from 'next';
import Link from '../components/Link';
import { Box } from '@chakra-ui/core';

const Home: NextPage = () => {
  return (
    <Box>
      <Link href="/admin">Dashboard</Link>
    </Box>
  );
};

export default Home;
