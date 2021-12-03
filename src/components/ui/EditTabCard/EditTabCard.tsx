import classNames from 'classnames';
import React from 'react';
import { UseFormRegisterReturn, Control, useWatch } from 'react-hook-form';
import { ICarFormData } from '../../../utils/types/formTypes';
import FileInput from '../FileInput/FileInput';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './EditTabCard.module.scss';

interface IEditTabCardProps {
  title: string;
  subtitle: string;
  img?: string;
  descriptionRegisterReturn?: UseFormRegisterReturn;
  imgInputRegisterReturn?: UseFormRegisterReturn;
  imgInputErrorMessage?: string;
  fullness?: string;
  control?: Control<ICarFormData>;
  progressCalculateFunction?: (formValues: ICarFormData) => string;
}

const CarFormProgressWatched = ({
  control,
  progressCalculateFunction,
}: {
  control: Control<ICarFormData>;
  progressCalculateFunction: (formValues: ICarFormData) => string;
}) => {
  const formValues = useWatch({ control });
  let fullness;
  if (formValues.colors && formValues.imageFileList) {
    fullness = progressCalculateFunction(formValues as ICarFormData);
  } else {
    fullness = '0';
  }

  return <ProgressBar fullness={fullness} />;
};

const ImgWatched = ({
  control,
  defaultImg,
}: {
  control: Control<ICarFormData>;
  defaultImg: string;
}) => {
  const fileList = useWatch({ control, name: 'imageFileList' });
  const img = fileList?.[0] && URL.createObjectURL(fileList?.[0]);

  return (
    <div className={styles.imgWrapper}>
      <img className={styles.img} src={img || defaultImg} alt='cardImg' />
    </div>
  );
};

const FileInputWatched = ({
  control,
  errorMessage,
  registerReturn,
}: {
  control: Control<ICarFormData>;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
}) => {
  const fileList = useWatch({ control, name: 'imageFileList' });
  const fileName = fileList?.[0].name;

  return (
    <div className={styles.fileInputWrapper}>
      <FileInput
        name='carImgInput'
        registerReturn={registerReturn}
        fileName={fileName}
        errorMessage={errorMessage}
      />
    </div>
  );
};

function EditTabCard({
  title,
  subtitle,
  img,
  descriptionRegisterReturn,
  imgInputRegisterReturn,
  imgInputErrorMessage,
  control,
  progressCalculateFunction,
}: IEditTabCardProps) {
  return (
    <div className={styles.card}>
      {img && control && <ImgWatched control={control} defaultImg={img} />}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {img && control && (
        <FileInputWatched
          registerReturn={imgInputRegisterReturn}
          errorMessage={imgInputErrorMessage}
          control={control}
        />
      )}
      {control && progressCalculateFunction && (
        <div className={styles.progressBarWrapper}>
          <CarFormProgressWatched
            control={control}
            progressCalculateFunction={progressCalculateFunction}
          />
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

export default EditTabCard;
