import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';
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
  'PLAN_HASH_VALUE',
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
        PLAN_HASH_VALUE
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
  const { register, getValues, handleSubmit, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      type: TopSqlType.ElapsedTime,
      elapsedTimeMin: 3,
      bufferGetMin: 50000,
      take: 30,
      module: '%',
    },
  });
  const [findTopSqls, { data, error }] = useLazyQuery<
    FindTopSqlsQuery,
    FindTopSqlsQueryVariables
  >(FIND_TOP_SQLS);
  const columns = useMemo(
    () => headers.map(v => ({ Header: v, accessor: v })),
    [],
  );
  const onSubmit = () => {
    const { type, elapsedTimeMin, bufferGetMin, take, module } = getValues();
    const min =
      type == TopSqlType.ElapsedTime ? +elapsedTimeMin : +bufferGetMin;
    findTopSqls({
      variables: {
        input: {
          type,
          min,
          take: +take,
          module,
        },
      },
    });
  };
  // const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // const [rowData] = useState([
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 }
  // ]);

  // Each Column Definition results in one Column.
  const source = headers.map(header => ({ field: header }));
  const [columnDefs, setColumnDefs] = useState(source);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    resizable: true,
    filter: true,
    sortable: true,
    width: 150
  }), []);

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="ml-4 text-xl">TOP SQL List</h1>
      <div className="flex">
        <div className="flex flex-col">
          <div>
            <input type="radio" value="ELAPSED_TIME" {...register('type')} />
            <label htmlFor="ELAPSED_TIME"> ELAPSED_TIME</label>
            <label htmlFor="elapsedTimeMin">{' > '}</label>
            <input
              type="number"
              placeholder="min"
              disabled={watch().type == TopSqlType.ElapsedTime ? false : true}
              {...register('elapsedTimeMin')}
            />
          </div>
          <div>
            <input type="radio" value="BUFFER_GET" {...register('type')} />
            <label htmlFor="BUFFER_GET"> BUFFER_GET</label>
            <label htmlFor="bufferGetMin">{' > '}</label>
            <input
              type="number"
              placeholder="min"
              disabled={watch().type == TopSqlType.BufferGet ? false : true}
              {...register('bufferGetMin')}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label htmlFor="top" className="mr-2">
              Module
            </label>
            <input placeholder="module" {...register('module')} />
          </div>
          <div>
            <label htmlFor="top" className="mr-2">
              TOP
            </label>
            <input type="number" placeholder="top" {...register('take')} />
          </div>
        </div>
        <button type="submit" className="btn">
          Search
        </button>
      </div>
      <div>
        {/* {data?.findTopSqls.topSqls ? ( */}
        {/*   <Table columns={columns} data={data.findTopSqls.topSqls} /> */}
        {/* ) : ( */}
        {/*   <Table columns={columns} data={[]} /> */}
        {/* )} */}
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
          <AgGridReact
            // ref={gridRef} // Ref for accessing Grid's API

            rowData={data?.findTopSqls.topSqls} // Row Data for Rows

            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows

          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          />
        </div>
      </div>
    </form>
  );
};
export default SqlList;
