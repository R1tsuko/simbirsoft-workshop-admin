import classNames from 'classnames';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import FileInput from '../FileInput/FileInput';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './EditTabCard.module.scss';

interface IEditTabCardProps {
  title: string;
  subtitle: string;
  img?: string;
  imgName?: string;
  descriptionRegisterReturn?: UseFormRegisterReturn;
  imgInputRegisterReturn?: UseFormRegisterReturn;
  onAddImg?: (img: File | undefined) => void;
  imgInputErrorMessage?: string;
  fullness?: string;
}

function EditTabCard({
  title,
  subtitle,
  img,
  descriptionRegisterReturn,
  imgInputRegisterReturn,
  onAddImg,
  imgName,
  imgInputErrorMessage,
  fullness,
}: IEditTabCardProps) {
  return (
    <div className={styles.card}>
      {img && (
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={img} alt='auto' />
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {onAddImg && (
        <div className={styles.fileInputWrapper}>
          <FileInput
            name='carImgInput'
            registerReturn={imgInputRegisterReturn}
            onAddImg={onAddImg}
            fileName={imgName}
            errorMessage={imgInputErrorMessage}
          />
        </div>
      )}
      {fullness !== undefined && (
        <div className={styles.progressBarWrapper}>
          <ProgressBar fullness={fullness} />
        </div>
      )}
      {descriptionRegisterReturn && (
        <div className={styles.descriptionContainer}>
          <div className={styles.title}>Описание</div>
          <textarea
            className={classNames(styles.textarea)}
            {...descriptionRegisterReturn}
            placeholder='Введите описание...'
          />
        </div>
      )}
    </div>
  );
}

EditTabCard.defaultProps = {
  img: undefined,
  descriptionRegisterReturn: undefined,
  imgInputRegisterReturn: undefined,
  onAddImg: undefined,
  imgName: undefined,
  imgInputErrorMessage: undefined,
  fullness: undefined,
};

export default EditTabCard;
