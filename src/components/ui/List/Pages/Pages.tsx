import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pages.module.scss';

const Pages = () => (
  <ReactPaginate
    containerClassName={styles.pagesContainer}
    pageClassName={styles.page}
    previousClassName={styles.previous}
    nextClassName={styles.next}
    breakClassName={styles.break}
    activeClassName={styles.active}
    breakLabel='...'
    nextLabel='>>'
    pageRangeDisplayed={3}
    pageCount={1000}
    previousLabel='<<'
    marginPagesDisplayed={1}
  />
);

export default Pages;
