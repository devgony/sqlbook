import { gql, useMutation, useQuery } from '@apollo/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import client from '../apollo-client';
import {
  CountTopSqlsQuery,
  CountTuningsQuery,
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
} from '../generated/graphql';

const COUNT_TOP_SQLS = gql`
  query countTopSqls {
    countTopSqls {
      ok
      error
      results {
        name
        count
      }
    }
  }
`;

const COUNT_TUNINGS = gql`
  query countTunings {
    countTunings {
      ok
      error
      results {
        name
        count
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, error } = useQuery<CountTopSqlsQuery>(COUNT_TOP_SQLS);
  const { data: dataCountTunings } = useQuery<CountTuningsQuery>(COUNT_TUNINGS);
  const router = useRouter();
  const pushTop = () => {
    router.push('top-sql/');
  };
  const pushTune = () => {
    router.push('tuning-history/');
  };
  return (
    <div className="w-full mt-40 py-10 flex justify-center text-center ">
      <div className="w-1/3 rounded-md cursor-pointer mr-12" onClick={pushTop}>
        <div className="bg-teal-700 hover:bg-teal-800 rounded-md py-4 text-gray-200 font-bold">
          TOP SQL
        </div>
        {data?.countTopSqls.results?.map(r => (
          <div className="py-8 my-2 bg-slate-200 rounded-md hover:bg-slate-300">
            {r.name}: {r.count}
          </div>
        ))}
      </div>
      <div className="w-1/3 rounded-md cursor-pointer" onClick={pushTune}>
        <div className="bg-teal-700 hover:bg-teal-800 rounded-md py-4 text-gray-200 font-bold">
          TUNING HISTORY
        </div>
        {dataCountTunings?.countTunings.results?.map(r => (
          <div className="py-8 my-2 bg-slate-200 rounded-md hover:bg-slate-300">
            {r.name}: {r.count}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
