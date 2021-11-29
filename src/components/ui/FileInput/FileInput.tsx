import React, { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FileInput.module.scss';

interface IFileInputProps {
  name: string;
  registerReturn?: UseFormRegisterReturn;
  onAddImg: (img: File | undefined) => void;
  fileName?: string;
  errorMessage?: string;
}

const FileInput: React.FC<IFileInputProps> = ({
  name,
  registerReturn,
  onAddImg,
  fileName,
  errorMessage,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAddImg(e.target.files?.[0]);
  };

  return (
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
          onChange={onChange}
        />
      </label>
    </div>
  );
};

FileInput.defaultProps = {
  registerReturn: undefined,
  fileName: undefined,
  errorMessage: undefined,
};

export default FileInput;
