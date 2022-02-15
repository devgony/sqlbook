import { gql } from '@apollo/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import client from '../apollo-client';

const Home = ({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(countries);
  return (
    <div className="bg-green-500">
      <h1 className="text-blue-400">it works</h1>
      <button className="btn">Test</button>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}

export default Home;
