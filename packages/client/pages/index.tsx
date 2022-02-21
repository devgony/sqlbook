import { gql, useMutation, useQuery } from '@apollo/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import client from '../apollo-client';
import {
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
} from '../generated/graphql';

const Home: NextPage = () => {
  const router = useRouter();
  const pushTop = () => {
    router.push('top-sql/');
  };
  const pushTune = () => {
    router.push('tuning-history/');
  };
  return (
    <div className="w-full h-1/3 mt-40 flex justify-around bg-gray-200 text-center ">
      <div
        className="bg-gray-300 w-1/3 rounded-md cursor-pointer shadow-xl hover:drop-shadow-2xl"
        onClick={pushTop}
      >
        <div className="bg-blue-300 rounded-md">TOP SQL</div>
        <ul>
          <li>list1</li>
          <li>list2</li>
          <li>list3</li>
          <li>list4</li>
          <li>list5</li>
        </ul>
      </div>
      <div
        className="bg-gray-300 w-1/3 rounded-md cursor-pointer shadow-xl hover:drop-shadow-2xl"
        onClick={pushTune}
      >
        <div className="bg-blue-300 rounded-md">TUNING HISTORY</div>
        <ul>
          <li>list1</li>
          <li>list2</li>
          <li>list3</li>
          <li>list4</li>
          <li>list5</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
