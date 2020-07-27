import React from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated';

const PrivateRoute: React.FC = ({ children }) => {
  const { loading, error, data } = useMeQuery();
  const router = useRouter();

  if (error) {
    return <h1>Auth error</h1>;
  }

  if (loading) {
    return null;
  }

  if (data.me) {
    return <>{children}</>;
  } else {
    router.push('/auth/signIn');
    return null;
  }
};

export default PrivateRoute;
