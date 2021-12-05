import React from 'react';
import styles from './Loader.module.scss';

interface ILoaderProps {
  wrapperHeight?: string
}

const Loader: React.FC<ILoaderProps> = ({wrapperHeight}) => (
  <div style={{height: wrapperHeight}} className={styles.loaderWrapper}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
