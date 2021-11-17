import React from 'react';
import styles from './ProgressBar.module.scss';

interface IProgressBarProps {
  fullness?: string;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ fullness }) => (
  <div className={styles.progressContainer}>
    <div className={styles.info}>
      <span className={styles.text}>Заполнено</span>
      <span className={styles.percentage}>{fullness}%</span>
    </div>
    <progress className={styles.progressBar} max='100' value={fullness}>
      asd
    </progress>
  </div>
);

ProgressBar.defaultProps = {
  fullness: '0',
};

export default ProgressBar;
