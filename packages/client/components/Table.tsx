/* eslint-disable react/jsx-key */
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  UseTableColumnProps,
} from 'react-table';

const Styles = styled.div`
  padding: 1rem;
  ${
    '' /* These styles are suggested for the table fill all available space in its containing element */
  }
  display: block;
  ${
    '' /* These styles are required for a horizontaly scrollable table overflow */
  }
  overflow: auto;

  .table {
    border-spacing: 0;
    border: 1px solid #ddd;
    /* font-family: Arial, Helvetica, sans-serif; */
    /* border-collapse: collapse; */
    font-size: 12px;
    .thead {
      ${
        '' /* These styles are required for a scrollable body to align with the header properly */
      }
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #04aa6d;
      color: white;
    }

    .tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .tr:hover {
      background-color: #ddd;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      /* height: 250px; */
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #ddd;
    }

    .th,
    .td {
      margin: 0;
      /* padding: 0.5rem; */
      padding: 0.5rem 0.1rem;
      border-right: 1px solid #ddd;

      ${
        '' /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        /* background: gray; */
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

//@ts-ignore
// const headerProps = (props, { column }) => getStyles(props, column.align);
//@ts-ignore
const cellProps = (props, { cell }) => getStyles(props, cell.column.align);
//@ts-ignore
const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

// const IndeterminateCheckbox = forwardRef(
//   ({ indeterminate, ...rest }: any, ref) => {
//     const defaultRef = useRef();
//     const resolvedRef = ref || defaultRef;

//     useEffect(() => {
//       // @ts-ignore
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     );
//   },
// );

export default function Table({ columns, data }: any) {
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    [],
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useResizeColumns,
    useFlexLayout,
    // useRowSelect,
    useSortBy,
    // hooks => {
    //   hooks.allColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: 'selection',
    //       disableResizing: true,
    //       minWidth: 35,
    //       width: 35,
    //       maxWidth: 35,
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    //   hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    //     // fix the parent group of the selection button to not be resizable
    //     const selectionGroupHeader = headerGroups[0].headers[0];
    //     selectionGroupHeader.canResize = false;
    //   });
    // },
  );

  return (
    <Styles>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map(headerGroup => (
            <div
              {...headerGroup.getHeaderGroupProps({
                // style: { paddingRight: '15px' },
              })}
              className="tr"
            >
              {headerGroup.headers.map(column => (
                <div
                  className="th thead"
                  id="arrow-container"
                  // {...column.getHeaderProps(headerProps)}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span id="arrow">{column.isSortedDesc ? '⬇' : '⬆'}</span>
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          {rows.map(row => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps(cellProps)} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}
