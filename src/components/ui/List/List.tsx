import React from 'react';
import { ListFormFields } from '../../../utils/types';
import styles from './List.module.scss';
import ListForm from './ListForm/ListForm';
import Pages from './Pages/Pages';

interface IListProps {
  children: React.ReactNode;
  formFields: ListFormFields;
}

const List: React.FC<IListProps> = ({ children, formFields }) => (
  <div className={styles.listContainer}>
    <ListForm fields={formFields} />
    <div className={styles.content}>{children}</div>
    <div className={styles.pagesWrapper}>
      <Pages />
    </div>
  </div>
);

export default List;
