import { useQuery } from '@apollo/client';
import React from 'react';
import { TEST } from '../../graphql/queries/test';

const TestPage: React.FC = () => {
  const { data, error, loading } = useQuery<{hello: string}>(TEST);

  if (loading) {
    return <p>now loading...</p>;
  }

  return error ? (
    <p>{`There was an error: ${JSON.stringify(error)}`}</p>
  ) : (
    <div>
      <h2>From GraphQL</h2>
      <p>{`Response: ${data?.hello}`}</p>
    </div>
  )
}
export default TestPage;