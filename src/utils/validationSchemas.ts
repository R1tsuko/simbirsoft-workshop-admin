import * as yup from 'yup';
import { setYupLocale } from './helpers/commonHelpers';

setYupLocale();

export const carFormSchema = yup.object({
  name: yup.string().max(100).required(),
  priceMin: yup
    .number()
    .transform((cv, ov) => (ov === '' ? undefined : cv))
    .positive()
    .required(),
  priceMax: yup
    .number()
    .transform((cv, ov) => (ov === '' ? undefined : cv))
    .positive()
    .required(),
  tank: yup
    .number()
    .transform((cv, ov) => (ov === '' ? undefined : cv))
    .min(0)
    .max(100),
  imageFileList: yup.mixed().when('$isCreatingCar', {
    is: true,
    then: yup
      .mixed()
      .test(
        'fileListLength',
        'Вы не выбрали файл',
        (fileList: FileList | Array<File>) => fileList.length === 1
      ),
  }),

  colors: yup.array().min(1, 'Вы не ввели ни одного цвета'),
});

export const loginFormSchema = yup.object({
  username: yup.string().max(15).required(),
  password: yup.string().max(15).required(),
});

export const pointFormSchema = yup.object({
  name: yup.string().max(25).required(),
  address: yup.string().max(40).required(),
});
