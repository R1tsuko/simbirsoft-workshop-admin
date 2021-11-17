import React from 'react';
import FileInput from '../FileInput/FileInput';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './EditTabCard.module.scss';

interface IEditTabCardProps {
  title: string;
  subtitle: string;
  progressFulness?: string;
  img?: string;
  description?: string;
}

const EditTabCard: React.FC<IEditTabCardProps> = ({
  title,
  subtitle,
  progressFulness,
  img,
  description,
}) => (
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
    {img && (
      <div className={styles.fileInputWrapper}>
        <FileInput name='carImgInput' />
      </div>
    )}
    {progressFulness && (
      <div className={styles.progressBarWrapper}>
        <ProgressBar fullness={progressFulness} />
      </div>
    )}
    {description && (
      <div className={styles.descriptionContainer}>
        <div className={styles.title}>Описание</div>
        <div className={styles.text}>{description}</div>
      </div>
    )}
  </div>
);

EditTabCard.defaultProps = {
  progressFulness: undefined,
  img: undefined,
  description: undefined,
};

export default EditTabCard;
