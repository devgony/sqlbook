import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import { CellEditRequestEvent } from 'ag-grid-community';

const headers = [
  'CREATED_AT',
  'INSTANCE_NUMBER',
  'SQL_ID',
  'PLAN_HASH_VALUE',
  'ASSIGNEE',
  'COMPLETED',
  'COMMENT',
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
]
const gqlProjection = headers.reduce((acc, cur) => `${acc}\n${cur}`);
const FIND_TUNINGS = gql`
  query findTunings {
    findTunings {
      ok
      tunings {
        ${gqlProjection} 
      } 
    }
}`

const TuningHistory: NextPage = () => {
  const client = useApolloClient();
  const { data, error } = useQuery(FIND_TUNINGS);
  console.log(data);
  const additionalColumnOptions = {
    editable: true,
    cellEditor: 'agTextCellEditor',
    valuSetter: (v: unknown) => { console.log(v) }
  }
  const additionalColumnOptionsList = ['ASSIGNEE', 'COMPLETED', 'COMMENT'];
  const source = headers.map(header => (additionalColumnOptionsList.includes(header) ? { field: header, ...additionalColumnOptions } : { field: header }));
  const [columnDefs, setColumnDefs] = useState(source);
  const defaultColDef = useMemo(() => ({
    resizable: true,
    filter: true,
    sortable: true,
    width: 150,
  }), []);
  const onCellEditRequest = (event: CellEditRequestEvent) => {
    console.log(event);
    const { newValue, rowIndex, colDef: { field }, data: { SQL_ID, PLAN_HASH_VALUE } } = event;
    if (field) {
      client.cache.modify({
        id: `Tuning:${SQL_ID}||${PLAN_HASH_VALUE}`,
        fields: {
          [field](_) {
            return newValue
          }
        },
      })
    }
  };
  return <div>
    <div className="mt-2 ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={data?.findTunings.tunings} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        readOnlyEdit={true}
        onCellEditRequest={onCellEditRequest}
      // animateRows={true} // Optional - set to 'true' to have rows animate when sorted
      // rowSelection='multiple' // Options - allows click selection of rows
      // ref={gridRef}
      // onSelectionChanged={onSelectionChanged}
      />
    </div>
  </div>

};
export default TuningHistory;
