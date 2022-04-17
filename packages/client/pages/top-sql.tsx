import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useMemo } from 'react';
import Table from '../components/Table';
import {
  FindSqlStatTextsQuery,
  FindSqlStatTextsQueryVariables,
} from '../generated/graphql';

const headers = [
  'SNAP_ID',
  'BEGIN_INTERVAL_TIME',
  'END_INTERVAL_TIME',
  'DBID',
  'INSTANCE_NUMBER',
  'SQL_ID',
  'SQL_TEXT',
  'PLAN_HASH_VALUE',
  'VERSION_COUNT',
  'MODULE',
  'FETCHES_TOTAL',
  'FETCHES_DELTA',
  'END_OF_FETCH_COUNT_TOTAL',
  'END_OF_FETCH_COUNT_DELTA',
  'SORTS_TOTAL',
  'SORTS_DELTA',
  'EXECUTIONS_TOTAL',
  'EXECUTIONS_DELTA',
  'LOADS_TOTAL',
  'LOADS_DELTA',
  'PARSE_CALLS_TOTAL',
  'PARSE_CALLS_DELTA',
  'DISK_READS_TOTAL',
  'DISK_READS_DELTA',
  'BUFFER_GETS_TOTAL',
  'BUFFER_GETS_DELTA',
  'ROWS_PROCESSED_TOTAL',
  'ROWS_PROCESSED_DELTA',
  'CPU_TIME_TOTAL',
  'CPU_TIME_DELTA',
  'ELAPSED_TIME_TOTAL',
  'ELAPSED_TIME_DELTA',
  'DIRECT_WRITES_TOTAL',
  'DIRECT_WRITES_DELTA',
  'PHYSICAL_READ_BYTES_TOTAL',
  'PHYSICAL_READ_BYTES_DELTA',
  'PHYSICAL_WRITE_BYTES_TOTAL',
  'PHYSICAL_WRITE_BYTES_DELTA',
];

const FIND_SQL_HISTS = gql`
  query findSqlStatTexts($input: FindSqlStatTextsInput!) {
    findSqlStatTexts(input: $input) {
      ok
      error
      totalPages
      totalResults
      sqlStatTexts {
        SNAP_ID
        BEGIN_INTERVAL_TIME
        END_INTERVAL_TIME
        DBID
        INSTANCE_NUMBER
        SQL_ID
        SQL_TEXT
        PLAN_HASH_VALUE
        VERSION_COUNT
        MODULE
        FETCHES_TOTAL
        FETCHES_DELTA
        END_OF_FETCH_COUNT_TOTAL
        END_OF_FETCH_COUNT_DELTA
        SORTS_TOTAL
        SORTS_DELTA
        EXECUTIONS_TOTAL
        EXECUTIONS_DELTA
        LOADS_TOTAL
        LOADS_DELTA
        PARSE_CALLS_TOTAL
        PARSE_CALLS_DELTA
        DISK_READS_TOTAL
        DISK_READS_DELTA
        BUFFER_GETS_TOTAL
        BUFFER_GETS_DELTA
        ROWS_PROCESSED_TOTAL
        ROWS_PROCESSED_DELTA
        CPU_TIME_TOTAL
        CPU_TIME_DELTA
        ELAPSED_TIME_TOTAL
        ELAPSED_TIME_DELTA
        DIRECT_WRITES_TOTAL
        DIRECT_WRITES_DELTA
        PHYSICAL_READ_BYTES_TOTAL
        PHYSICAL_READ_BYTES_DELTA
        PHYSICAL_WRITE_BYTES_TOTAL
        PHYSICAL_WRITE_BYTES_DELTA
      }
    }
  }
`;

const TopSql: NextPage = () => {
  const [findSqlHists, { data, error }] = useLazyQuery<
    FindSqlStatTextsQuery,
    FindSqlStatTextsQueryVariables
  >(FIND_SQL_HISTS, { variables: { input: { page: 1 } } });
  const columns = useMemo(
    () => headers.map(v => ({ Header: v, accessor: v })),
    [],
  );
  return (
    <div className="mt-10">
      <h1>TOP SQL List</h1>
      <input className="bg-gray-200 mr-1" placeholder="DB" />
      <input className="bg-gray-200 mr-1" placeholder="Date" />
      <input className="bg-gray-200 mr-1" placeholder="Time" />
      <input className="bg-gray-200 mr-1" placeholder="Module" />
      <input className="bg-gray-200 mr-1" placeholder="User" />
      <button className="btn" onClick={() => findSqlHists()}>
        Search
      </button>
      <div>
        {data?.findSqlStatTexts.sqlStatTexts ? (
          <Table columns={columns} data={data.findSqlStatTexts.sqlStatTexts} />
        ) : (
          <Table columns={columns} data={[]} />
        )}
      </div>
    </div>
  );
};
export default TopSql;
