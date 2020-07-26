import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
  query Main2 {
    users {
      id
      email
    }
  }
`;

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
      <h2>Users: </h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
