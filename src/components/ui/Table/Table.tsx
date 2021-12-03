import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Table.module.scss';

interface ITableProps<T> {
  rows: Array<
    Record<keyof T, string | ReactNode> & {
      link?: string;
      onRowClick?: () => void;
    }
  >;
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
            <th
              className={classNames(styles.cell, styles.headerText)}
              key={headerName}
            >
              {headersData[headerName]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {rows.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr className={styles.row} key={index}>
            {Object.keys(row)
              .filter(
                (rowItemName) =>
                  rowItemName !== 'link' &&
                  rowItemName !== 'onRowClick' &&
                  rowItemName !== 'itemId'
              )
              .map((headerName) => (
                <td className={styles.cell} key={headerName}>
                  <div
                    className={classNames(
                      styles.localHeader,
                      styles.headerText
                    )}
                  >
                    {headersData[headerName]}
                  </div>
                  {row[headerName]}
                </td>
              ))}
            <td className={styles.cellLink}>
              {row.link && (
                <Link
                  className={styles.link}
                  to={row.link}
                  onMouseDown={() => row.onRowClick?.()}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
