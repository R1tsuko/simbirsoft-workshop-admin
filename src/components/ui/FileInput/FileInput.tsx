import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FileInput.module.scss';

interface IFileInputProps {
  name: string;
  registerReturn?: UseFormRegisterReturn;
  fileName?: string;
  errorMessage?: string;
}

const FileInput: React.FC<IFileInputProps> = ({
  name,
  registerReturn,
  fileName,
  errorMessage,
}) => (
  <div className={styles.inputContainer}>
    <div className={styles.error}>{errorMessage}</div>
    <label className={styles.label} htmlFor={name}>
      <div className={styles.fakeInput}>{fileName || 'Выберите файл...'}</div>
      <div className={styles.fakeButton}>Обзор</div>
      <input
        id={name}
        className={styles.input}
        {...registerReturn}
        type='file'
        accept='image/png'
      />
    </label>
  </div>
);

export default FileInput;
