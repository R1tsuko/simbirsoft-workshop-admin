import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pages.module.scss';

interface IPagesProps {
  onPageChange: (page: number) => void;
  page: number;
  pagesCount?: number;
}

const Pages: React.FC<IPagesProps> = ({ onPageChange, page, pagesCount }) => (
  <ReactPaginate
    forcePage={page}
    containerClassName={styles.pagesContainer}
    pageClassName={styles.page}
    previousClassName={styles.previous}
    nextClassName={styles.next}
    breakClassName={styles.break}
    activeClassName={styles.active}
    breakLabel='...'
    nextLabel='>>'
    pageRangeDisplayed={3}
    pageCount={pagesCount || 1}
    previousLabel='<<'
    marginPagesDisplayed={1}
    onPageChange={({ selected }) => onPageChange?.(selected)}
  />
);

export default Pages;
