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
import { Helmet } from 'react-helmet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo-client';
import Login from '../components/Login';
import {
  FindDbsQuery,
  TestDbInput,
  TestDbQuery,
  CreateDbMutation,
  CreateDbMutationVariables,
  DeleteDbMutation,
  DeleteDbMutationVariables,
  GatherQuery,
} from '../generated/graphql';
import { TITLE } from '../utils/const';

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

const DELETE_DB = gql`
  mutation deleteDb($input: DeleteDbInput!) {
    deleteDb(input: $input) {
      ok
      error
    }
  }
`;

const GATHER = gql`
  query gather($input: GatherInput!) {
    gather(input: $input) {
      ok
      error
    }
  }
`;

const AdminBody = () => {
  const [testRequired, setTestRequired] = useState(true);
  const [targetDb, setTargetDb] = useState('');

  const onCompletedGather = (data: GatherQuery) => {
    const { ok, error } = data.gather;
    if (!ok) {
      console.log(error);
      return alert(error);
    }
    return alert('Gathering SQL completed!');
  };
  const [gather, { data: dataGather }] = useLazyQuery<GatherQuery>(GATHER, {
    onCompleted: onCompletedGather,
  });

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

  const onCompletedDeleteDb = (data: DeleteDbMutation) => {
    const { ok, error } = data.deleteDb;
    if (!ok) {
      alert(error);
      return;
    }
    refetch();
  };
  const [deleteDb, { data: dataDeleteDb }] = useMutation<
    DeleteDbMutation,
    DeleteDbMutationVariables
  >(DELETE_DB, { onCompleted: onCompletedDeleteDb });

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

  const runDeleteDb = (name: string) => {
    const ok = window.confirm(`Delete ${name}?`);
    if (ok) {
      deleteDb({ variables: { input: { name } } });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`Admin | ${TITLE}`}</title>
      </Helmet>
      <h1 className="ml-4 mt-6 mb-4 text-xl text-center font-bold">
        Databases to gather SQL
      </h1>
      <div className="flex flex-col h-96 items-center text-sm">
        <div className="w-full py-2 bg-teal-900 text-gray-100 grid text-center gap-0.5 grid-cols-[20px,13%,15%,13%,13%,13%,13%,60px,60px] justify-center">
          <span />
          <span>NAME</span>
          <span>HOST</span>
          <span>PORT</span>
          <span>SERVICE_NAME</span>
          <span>USER</span>
          <span>PASSWORD</span>
          <span></span>
          <span></span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-100 grid text-center gap-0.5 grid-cols-[20px,13%,15%,13%,13%,13%,13%,60px,60px] justify-center shadow-xl mb-6"
        >
          {data?.findDbs.dbs.map((db, i) => (
            <Fragment key={i}>
              <input
                type="radio"
                name="chosen-db"
                onClick={() => setTargetDb(db.name)}
              />
              <input value={db.name} readOnly={true} />
              <input value={db.host} readOnly={true} />
              <input value={db.port} readOnly={true} />
              <input value={db.schema} readOnly={true} />
              <input value={db.username} readOnly={true} />
              <input
                name="password"
                type="password"
                value="******"
                readOnly={true}
              />
              <button
                type="button"
                className="btn"
                onClick={() => runDeleteDb(db.name)}
              >
                Delete
              </button>
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
                onClick={() => {}}
                // todo - handle lazy tailwind
                className={`px-2 py-2 text-gray-100 rounded text-xs ${
                  testRequired
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : 'bg-teal-700 hover:bg-teal-800'
                }`}
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
        <button
          className="btn"
          onClick={() => gather({ variables: { input: { name: targetDb } } })}
        >
          Gather SQL
        </button>
      </div>
    </div>
  );
};
