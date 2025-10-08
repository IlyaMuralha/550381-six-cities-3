import { toast } from 'react-toastify';
import { TOffer } from './components/offer-card/types';
import { TReview } from './components/review/types';
import { AppRoute, MAX_RATING, PLACE_OPTIONS } from './const';
import { HTMLLoginForm } from './pages/login-screen/login-screen';


export const getLayoutState = (pathname: AppRoute) => {
  let mainClassName = '',
    shouldRenderUser = true,
    shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    mainClassName = 'page--gray page--main';
  } else if (pathname === AppRoute.Login) {
    mainClassName = 'page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }

  return { mainClassName, shouldRenderUser, shouldRenderFooter };
};

export const calcRating = (rating: number) => rating * 100 / MAX_RATING;

export const getSortedOffers = (offers: TOffer[], activeSort: typeof PLACE_OPTIONS[number]) => {
  let sortedOffers = offers;

  switch (activeSort) {
    case PLACE_OPTIONS[1]:
      sortedOffers = offers.toSorted((a, b) => a.price - b.price);
      break;
    case PLACE_OPTIONS[2]:
      sortedOffers = offers.toSorted((a, b) => b.price - a.price);
      break;
    case PLACE_OPTIONS[3]:
      sortedOffers = offers.toSorted((a, b) => b.rating - a.rating);
      break;
  }

  return sortedOffers;
};

export function ucFirst(str: string) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

export function getReverseAndSliceArray(arr: TReview[], maxLength: number): TReview[] {
  return [...arr].reverse().slice(0, maxLength);
}

export const validateLoginForm = (data: HTMLLoginForm): boolean => {
  if (!data.email) {
    toast.error('Email обязателен');
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    toast.error('Некорректный формат email');
    return false;
  }

  if (!data.password) {
    toast.error('Пароль обязателен');
    return false;
  }

  if (!/(?=.*[a-zA-Z])/.test(data.password) || !/(?=.*\d)/.test(data.password)) {
    toast.error('Пароль должен содержать минимум одну букву и одну цифру');
    return false;
  }

  return true;
};
