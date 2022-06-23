import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Table from '../components/Table';
import {
  FindTopSqlsQuery,
  FindTopSqlsQueryVariables,
  TopSqlType,
} from '../generated/graphql';

const headers = [
  'INSTANCE_NUMBER',
  'SQL_ID',
  'PARSING_SCHEMA_NAME',
  'MODULE',
  'JOB_NAME',
  'SQL_TEXT',
  'EXECUTIONS',
  'BUFFER_GETS_TOTAL',
  'ROWS_PROCESSED',
  'TOTAL_ELAPSED_MIN',
  'AVG_ROWS',
  'AVG_ELAPSED_SEC',
  'AVG_BUFFER_GETS',
  'AVG_DISK_READS',
  'TOTAL_CPU_MIN',
  'TOTAL_IOWAIT_MIN',
  'TOTAL_CLWAIT_MIN',
  'TOTAL_APWAIT_MIN',
  'TOTAL_CCWAIT_MIN',
  'AVG_CPU_SEC',
  'AVG_IOWAIT_SEC',
  'AVG_CLWAIT_SEC',
  'AVG_APWAIT_SEC',
  'AVG_CCWAIT_SEC',
  'LAST_EXEC_TIME',
  'FIRST_EXEC_TIME',
];

const FIND_TOP_SQLS = gql`
  query findTopSqls($input: FindTopSqlsInput!) {
    findTopSqls(input: $input) {
      ok
      error
      topSqls {
        INSTANCE_NUMBER
        SQL_ID
        PARSING_SCHEMA_NAME
        MODULE
        JOB_NAME
        SQL_TEXT
        EXECUTIONS
        BUFFER_GETS_TOTAL
        ROWS_PROCESSED
        TOTAL_ELAPSED_MIN
        AVG_ROWS
        AVG_ELAPSED_SEC
        AVG_BUFFER_GETS
        AVG_DISK_READS
        TOTAL_CPU_MIN
        TOTAL_IOWAIT_MIN
        TOTAL_CLWAIT_MIN
        TOTAL_APWAIT_MIN
        TOTAL_CCWAIT_MIN
        AVG_CPU_SEC
        AVG_IOWAIT_SEC
        AVG_CLWAIT_SEC
        AVG_APWAIT_SEC
        AVG_CCWAIT_SEC
        LAST_EXEC_TIME
        FIRST_EXEC_TIME
      }
    }
  }
`;

const SqlList: NextPage = () => {
  const { register, getValues, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const [findSqlHists, { data, error }] = useLazyQuery<
    FindTopSqlsQuery,
    FindTopSqlsQueryVariables
  >(FIND_TOP_SQLS);
  const columns = useMemo(
    () => headers.map(v => ({ Header: v, accessor: v })),
    [],
  );
  const onSubmit = () => {
    const { dbName, date, module, user } = getValues();
    findSqlHists({
      variables: {
        input: {
          type: TopSqlType.ElapsedTime,
          min: 3,
          take: 30,
        },
      },
    });
  };
  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="ml-4">TOP SQL List</h1>
      <input type="radio" name="type" value="io" />
      <label htmlFor="io">IO</label>
      <input type="radio" name="type" value="cpu" />
      <label htmlFor="cpu">CPU</label>
      <button type="submit" className="btn">
        Search
      </button>
      <div>
        {data?.findTopSqls.topSqls ? (
          <Table columns={columns} data={data.findTopSqls.topSqls} />
        ) : (
          <Table columns={columns} data={[]} />
        )}
      </div>
    </form>
  );
};
export default SqlList;
