export const CITIES: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const PLACES_OPTIONS: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const URL_MARKER_DEFAULT =
  '/img/pin.svg';

export const URL_MARKER_ACTIVE =
  '/img/pin-active.svg';

export const MAX_RATING = 5;
