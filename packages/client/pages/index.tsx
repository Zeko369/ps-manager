import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

import { QUERY } from '../modules/users/query';

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <>
        <h2>error...</h2>
        <code>{error}</code>
      </>
    );
  }

  return (
    <div>
      <h2>Products: </h2>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
