import { createAction } from '@reduxjs/toolkit';
import { PLACE_OPTIONS } from '../const';
import { TOffers } from '../components/offer-card/types';

export const setCity = createAction<string>('offers/setCity');
export const setActiveSort = createAction<typeof PLACE_OPTIONS[number]>('offers/setActiveSort');
export const loadOffers = createAction<TOffers>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
