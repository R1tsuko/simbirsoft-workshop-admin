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
        formData.append(key, postCarData[key as keyof IPostCarData].toString());
    }
  });

  return formData;
};
