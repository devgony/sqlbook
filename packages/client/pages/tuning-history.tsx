import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  gql,
  MutationUpdaterFn,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import { CellEditRequestEvent, ColDef } from 'ag-grid-community';
import {
  EditTuningMutation,
  EditTuningMutationVariables,
  FindDbsQuery,
  FindTuningsQuery,
  FindTuningsQueryVariables,
} from '../generated/graphql';
import { useForm } from 'react-hook-form';
import { FIND_DBS_NAME } from '../utils/gqls';

const headers = [
  'CREATED_AT',
  'DBID',
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
];
// const gqlProjection = headers.reduce((acc, cur) => `${acc}\n${cur}`);
const FIND_TUNINGS = gql`
  query findTunings($input: FindTuningsInput!) {
    findTunings(input: $input) {
      ok
      tunings {
        CREATED_AT
        DBID
        INSTANCE_NUMBER
        SQL_ID
        PLAN_HASH_VALUE
        ASSIGNEE
        COMPLETED
        COMMENT
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
        CREATED_AT
        INSTANCE_NUMBER
        SQL_ID
        PLAN_HASH_VALUE
        ASSIGNEE
        COMPLETED
        COMMENT
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
        CREATED_AT
        INSTANCE_NUMBER
        SQL_ID
        PLAN_HASH_VALUE
        ASSIGNEE
        COMPLETED
        COMMENT
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
        CREATED_AT
        INSTANCE_NUMBER
        SQL_ID
        PLAN_HASH_VALUE
        ASSIGNEE
        COMPLETED
        COMMENT
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

const EDIT_TUNING = gql`
  mutation editTuning($input: EditTuningInput!) {
    editTuning(input: $input) {
      ok
      error
      SQL_ID
      PLAN_HASH_VALUE
      ASSIGNEE
      COMPLETED
      COMMENT
    }
  }
`;

const TuningHistory: NextPage = () => {
  // const client = useApolloClient();
  const onCompleted = () => { };
  const editTuningUpdate: MutationUpdaterFn<EditTuningMutation> = (
    cache,
    result,
  ) => {
    if (!result.data?.editTuning.ok) {
      alert('failed to edit');
      return;
    }
    console.log('here');
    const { SQL_ID, PLAN_HASH_VALUE, ASSIGNEE, COMPLETED, COMMENT } =
      result.data.editTuning;
    console.log(result.data.editTuning);
    if (SQL_ID && PLAN_HASH_VALUE) {
      cache.writeFragment({
        id: `Tuning:${SQL_ID}||${PLAN_HASH_VALUE}`,
        fragment: gql`
          fragment MyTuning on Tuning {
            ASSIGNEE
            COMPLETED
            COMMENT
          }
        `,
        data: {
          ASSIGNEE,
          COMPLETED,
          COMMENT,
        },
        // fields: {
        //   [field](_) {
        //     return newValue;
        //   },
        // },
      });
    }
  };
  const [editTuning, { data: dataEditTuning }] = useMutation<
    EditTuningMutation,
    EditTuningMutationVariables
  >(EDIT_TUNING, {
    onCompleted,
    update: editTuningUpdate,
  });
  const [findTunings, { data, error }] = useLazyQuery<
    FindTuningsQuery,
    FindTuningsQueryVariables
  >(FIND_TUNINGS);
  console.log(data);
  const blendColDef = (header: string) => {
    const common = { field: header };
    switch (header) {
      case 'ASSIGNEE':
        return {
          ...common,
          editable: true,
          cellEditor: 'agTextCellEditor',
        };
      case 'COMPLETED':
        return {
          ...common,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['Y', 'N'],
          },
        };
      case 'COMMENT':
        return {
          ...common,
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorPopup: true,
        };
      default:
        return common;
    }
  };
  const colDef = headers.map(header => blendColDef(header));
  const [columnDefs, _] = useState<ColDef[]>(colDef);
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      filter: true,
      sortable: true,
      width: 150,
    }),
    [],
  );
  const onCellEditRequest = (event: CellEditRequestEvent) => {
    const {
      newValue,
      rowIndex,
      colDef: { field },
      data: { SQL_ID, PLAN_HASH_VALUE },
    } = event;
    if (field) {
      let key = field as 'ASSIGNEE' | 'COMPLETED' | 'COMMENT';
      editTuning({
        variables: { input: { SQL_ID, PLAN_HASH_VALUE, [key]: newValue } },
      });
    }
  };

  const { register, getValues, handleSubmit, formState, watch } = useForm({
    mode: 'onChange',
  });
  const { data: dataFindDbsName } = useQuery<FindDbsQuery>(FIND_DBS_NAME);
  const handleChange = () => {
    const name = getValues('targetDb');
    findTunings({ variables: { input: { name } } });
  };
  return (
    <div className="ml-2">
      <h1 className="mt-8 text-xl">Tuning History</h1>
      <form
        className="mt-2 ag-theme-alpine"
        style={{ height: 600, width: '100%' }}
      >
        <select
          className="text-xl my-2"
          {...register('targetDb')}
          onChange={e => {
            register('targetDb').onChange(e);
            handleChange();
          }}
          id="db-select"
        >
          <option value="">Choose a database</option>
          {dataFindDbsName?.findDbs.dbs.map(db => (
            <option value={db.name}>{db.name}</option>
          ))}
        </select>
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
      </form>
    </div>
  );
};
export default TuningHistory;
