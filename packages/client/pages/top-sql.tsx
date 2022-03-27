import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useMemo } from 'react';
import Table from '../components/Table';
import {
  FindSqlHistsQuery,
  FindSqlHistsQueryVariables,
} from '../generated/graphql';

const FIND_SQL_HISTS = gql`
  query findSqlHists($input: FindSqlHistsInput!) {
    findSqlHists(input: $input) {
      ok
      error
      totalPages
      totalResults
      sqlHists {
        SNAP_ID
        SQL_ID
      }
    }
  }
`;

const TopSql: NextPage = () => {
  const { data, error } = useQuery<
    FindSqlHistsQuery,
    FindSqlHistsQueryVariables
  >(FIND_SQL_HISTS, { variables: { input: { page: 1 } } });
  console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: 'SNAP_ID',
        accessor: 'SNAP_ID', // accessor is the "key" in the data
      },
      {
        Header: 'SQL_ID',
        accessor: 'SQL_ID',
      },
    ],
    [],
  );

  return (
    <div className="mt-10">
      <h1>TOP SQL List</h1>
      <input placeholder="search" />
      <div className="w-full h-96 bg-slate-200">
        {data?.findSqlHists.sqlHists && (
          <Table columns={columns} data={data.findSqlHists.sqlHists} />
        )}
      </div>
    </div>
  );
};
export default TopSql;
