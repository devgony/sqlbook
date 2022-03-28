import { useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

export default function Table({ columns, data }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
      },
      useSortBy,
    );
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                id="arrow-container"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <span id="arrow">
                  {column.isSortedDesc ? '⬇' : '⬆'}
                  {/* {column.isSorted ? (
                    column.isSortedDesc ? (
                      ' ⬇️'
                    ) : (
                      ' ⬆️'
                    )
                  ) : (
                    <i id="arrow"> ⬇️</i>
                  )} */}
                </span>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
