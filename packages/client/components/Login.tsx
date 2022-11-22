import { gql, useMutation, useQuery } from '@apollo/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { useForm } from 'react-hook-form';
import client, { authTokenVar, isLoggedInVar } from '../apollo-client';
import {
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
} from '../generated/graphql';
import { LOCALSTORAGE_TOKEN } from '../utils/const';

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      token
      error
    }
  }
`;

const Login: NextPage = () => {
  const { register, getValues, handleSubmit, formState } = useForm<LoginInput>({
    mode: 'onChange',
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token, error },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    } else {
      alert(error);
    }
  };
  const [login, { data: loginResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN, { onCompleted });
  const onSubmit = () => {
    const { username, password } = getValues();
    console.log(username, password);
    login({
      variables: {
        input: { username, password },
      },
    });
  };
  return (
    <section className="h-full flex justify-center items-center">
      <form
        className="mb-24 flex flex-col h-56 w-80 bg-gray-200 px-4 justify-around"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Please Login with admin</h1>
        <input
          className="h-10 pl-2"
          placeholder="username"
          {...register('username')}
        />
        <input
          className="h-10 pl-2"
          placeholder="password"
          {...register('password')}
        />
        <button className="bg-sky-600 py-2">Login</button>
      </form>
    </section>
  );
};

export default Login;
