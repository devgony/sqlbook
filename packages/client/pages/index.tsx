import { gql } from '@apollo/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import client from '../apollo-client';

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);
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
      query findDbs {
        findDbs {
          dbs {
            id
            password
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}

export default Home;
