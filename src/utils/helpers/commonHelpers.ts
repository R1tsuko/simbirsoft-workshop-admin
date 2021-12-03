import { setLocale } from 'yup';
import { ICarFormData } from '../types/formTypes';
import { IPostCarData } from '../types/apiTypes';
import { BASE_URL } from '../constants';
import { ICarId, ICityId, IPointId } from '../types/entityTypes';
import defaultCar from '../../assets/images/DefaultCar.jpg';

export const getCarName = (carId: ICarId | null | undefined) =>
  carId?.name || 'Модель не найдена';

export const getCarImg = (carId: ICarId | null | undefined) =>
  (carId?.thumbnail.path[0] === '/'
    ? BASE_URL + carId?.thumbnail.path
    : carId?.thumbnail.path) || defaultCar;

export const getPointAddress = (pointId: IPointId | null | undefined) =>
  pointId?.address || 'Адрес не найден';

export const getCityName = (cityId: ICityId | null | undefined) =>
  cityId?.name || 'Город не найден';

export const getColorName = (color: string | null | undefined) =>
  // prettier-ignore
  (color && (color.charAt(0).toUpperCase() + color.slice(1))) || 'Любой';

export const encodeImgFileToUrl = async (img: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(img);
  });

export const postCarDataToFormData = (postCarData: IPostCarData) => {
  const formData = new FormData();

  Object.keys(postCarData).forEach((key) => {
    switch (key) {
      case 'colors':
        postCarData.colors.forEach((color) => formData.append(key, color));
        break;
      case 'thumbnail':
        if (postCarData.thumbnail instanceof File) {
          formData.append(key, postCarData.thumbnail);
        }
        break;
      case 'categoryId':
        formData.append(key, postCarData.categoryId.id);
        break;
      default:
        if (postCarData[key as keyof IPostCarData])
          formData.append(
            key,
            postCarData[key as keyof IPostCarData].toString()
          );
    }
  });

  return formData;
};

export const mapCarFormDataToPostCarData = ({
  description,
  name,
  imageFileList,
  priceMin,
  priceMax,
  categoryId,
  colors,
  tank,
}: ICarFormData): IPostCarData => ({
  name,
  description,
  thumbnail: imageFileList[0],
  priceMin,
  priceMax,
  categoryId: { id: categoryId },
  colors: colors.map((color) => color.name),
  tank,
});

export const setYupLocale = () => {
  setLocale({
    mixed: {
      required: 'Это поле обязятельно к заполнению',
      notType: ({ type }) => {
        let translatedType;
        switch (type) {
          case 'number':
            translatedType = 'число';
            break;
          case 'string':
            translatedType = 'строку';
            break;
          default:
            break;
        }
        return `Введите ${translatedType}`;
      },
    },
    string: {
      max: ({ max }) => `Не более ${max} символов`,
    },
    number: {
      positive: 'Число в поле должно быть положительным',
      integer: 'Число в поле должно быть целым',
      min: ({ min }) => `Число должно быть больше ${min}`,
      max: ({ max }) => `Число должно быть меньше ${max}`,
    },
  });
};

export const calculateCarFormProgress =
  (isCreatingCar: boolean) => (formValues: ICarFormData) => {
    const stepsCount = Object.keys(formValues).length;
    let completedStepsCount = 0;
    Object.keys(formValues).forEach((key) => {
      switch (key) {
        case 'imageFileList':
          if (!isCreatingCar || formValues.imageFileList.length) {
            completedStepsCount += 1;
          }
          break;
        case 'colors':
          if (formValues.colors.length) completedStepsCount += 1;
          break;
        default:
          {
            const value = formValues[key as keyof ICarFormData];
            if (value || typeof value === 'number') completedStepsCount += 1;
          }
          break;
      }
    });

    return Math.ceil((completedStepsCount / stepsCount) * 100).toString();
  };
