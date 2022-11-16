import {
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo-client';
import Login from '../components/Login';
import {
  FindDbsQuery,
  TestDbInput,
  TestDbQuery,
  CreateDbMutation,
  CreateDbMutationVariables,
} from '../generated/graphql';

// export const getServerSideProps = () => {
//   const data = useReactiveVar(isLoggedInVar);
//   return { props: { data } };
// };

// interface IAdmin {
//   data: boolean;
// }

const Admin: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  // return <AdminBody />;
  return isLoggedIn ? <AdminBody /> : <Login />;
};
export default Admin;

const FIND_DBS = gql`
  query findDbs {
    findDbs {
      dbs {
        name
        host
        port
        schema
        username
        password
      }
    }
  }
`;

const TEST_DB = gql`
  query testDb($input: TestDbInput!) {
    testDb(input: $input) {
      ok
      error
    }
  }
`;

const CREATE_DB = gql`
  mutation createDb($input: CreateDbInput!) {
    createDb(input: $input) {
      ok
      error
    }
  }
`;

const AdminBody = () => {
  const [testRequired, setTestRequired] = useState(true);
  const { register, getValues, handleSubmit, formState, watch } =
    useForm<TestDbInput>({
      mode: 'onChange',
      // defaultValues: {
      //   name: '',
      //   host: '',
      //   port: '',
      //   schema: '',
      //   username: '',
      //   password: '',
      // },
    });
  const { data, error, refetch } = useQuery<FindDbsQuery>(FIND_DBS);
  const onCompletedCreateDb = (data: CreateDbMutation) => {
    const { ok, error } = data.createDb;
    if (!ok) {
      alert(error);
      return;
    }
    refetch();
    setAdding(false);
  };
  const [createDb, { data: dataCreateDb }] = useMutation<
    CreateDbMutation,
    CreateDbMutationVariables
  >(CREATE_DB, { onCompleted: onCompletedCreateDb });
  const onCompletedTestDb = (data: TestDbQuery) => {
    const { ok, error } = data.testDb;
    if (!ok) {
      alert('Connection error');
      return;
    }
    setTestRequired(false);
    alert('Connection works!');
  };
  const [testDb, { data: dataTestDb }] = useLazyQuery(TEST_DB, {
    onCompleted: onCompletedTestDb,
  });
  const [adding, setAdding] = useState(false);
  const onSubmit: SubmitHandler<TestDbInput> = data => {
    const { port, ...others } = data;
    createDb({ variables: { input: { port: +port, ...others } } });
  };

  const runTest = () => {
    const { port, ...others } = getValues();
    console.log(port, others);
    testDb({ variables: { input: { port: +port, ...others } } });
  };

  return (
    <div className="flex flex-col h-96 bg-gray-300 items-center mt-12 text-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-red-200 grid text-center gap-0.5 grid-cols-[20px,13%,15%,13%,13%,13%,13%,60px,60px] justify-center"
      >
        <span />
        <span>NAME</span>
        <span>HOST</span>
        <span>PORT</span>
        <span>SERVICE_NAME</span>
        <span>USER</span>
        <span>PASSWORD</span>
        <span></span>
        <span></span>
        {data?.findDbs.dbs.map((db, i) => (
          <Fragment key={i}>
            <input type="radio" readOnly={true} />
            <input value={db.name} readOnly={true} />
            <input value={db.host} readOnly={true} />
            <input value={db.port} readOnly={true} />
            <input value={db.schema} readOnly={true} />
            <input value={db.username} readOnly={true} />
            <input name="password" value={db.password} readOnly={true} />
            <button className="btn">DELETE</button>
            <span />
          </Fragment>
        ))}
        {adding ? (
          <>
            <span />
            <input {...register('name', { required: true })} />
            <input {...register('host', { required: true })} />
            <input {...register('port', { required: true })} />
            <input {...register('schema', { required: true })} />
            <input {...register('username', { required: true })} />
            <input
              {...register('password', { required: true })}
              type="password"
            />
            <button className="btn" onClick={runTest} type="button">
              Test
            </button>
            <button
              onClick={() => { }}
              className={`btn ${testRequired ? 'bg-gray-400' : ''}`}
              disabled={testRequired}
              type="submit"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <button className="btn" onClick={() => setAdding(true)}>
              Add
            </button>
          </>
        )}
      </form>
      <button className="btn">Collect SQL</button>
    </div>
  );
};
