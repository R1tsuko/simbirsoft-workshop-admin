import React from 'react';
import { ListFormFields } from '../../../utils/types/formTypes';
import Loader from '../Loader/Loader';
import ListForm from './ListForm/ListForm';
import Pages from './Pages/Pages';
import styles from './List.module.scss';

interface IListProps<T> {
  children: React.ReactNode;
  formFields: ListFormFields<T>;
  onPageChange: (page: number) => void;
  page: number;
  pagesCount: number;
  onApplyFilters: (formData: T) => void;
  defaultFormValues: T;
  isSubmitting: boolean;
}

function List<T>({
  children,
  formFields,
  onPageChange,
  page,
  pagesCount,
  onApplyFilters,
  defaultFormValues,
  isSubmitting = false,
}: IListProps<T>) {
  return isSubmitting ? (
    <Loader wrapperHeight='400px' />
  ) : (
    <div className={styles.listContainer}>
      <ListForm
        fields={formFields}
        onApplyFilters={onApplyFilters}
        defaultValues={defaultFormValues}
      />
      <div className={styles.content}>{children}</div>
      <div className={styles.pagesWrapper}>
        <Pages
          onPageChange={onPageChange}
          page={page}
          pagesCount={pagesCount}
        />
      </div>
    </div>
  );
}

export default List;
