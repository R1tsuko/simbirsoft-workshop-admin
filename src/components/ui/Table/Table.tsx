import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Table.module.scss';

interface ITableProps<T> {
  rows: Array<Record<keyof T, string | ReactNode>>;
  headersData: T;
}

function Table<T extends Record<string, string>>({
  rows,
  headersData,
}: ITableProps<T>) {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          {Object.keys(headersData).map((headerName) => (
            <th className={classNames(styles.cell, styles.headerText)}>
              {headersData[headerName]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {rows.map((row) => (
          <tr className={styles.row}>
            {Object.keys(row).map((headerName) => (
              <td className={styles.cell}>
                <div
                  className={classNames(styles.localHeader, styles.headerText)}
                >
                  {headersData[headerName]}
                </div>
                {row[headerName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
