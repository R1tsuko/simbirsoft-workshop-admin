import React from 'react';
import styles from './FileInput.module.scss';

interface IFileInputProps {
  name: string;
}

const FileInput: React.FC<IFileInputProps> = ({ name }) => (
  <label className={styles.inputContainer} htmlFor={name}>
    <div className={styles.fakeInput}>Выберите файл...</div>
    <div className={styles.fakeButton}>Обзор</div>
    <input id={name} className={styles.input} type='file' accept='image/png' />
  </label>
);
export default FileInput;
