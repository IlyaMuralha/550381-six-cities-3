import { createAction } from '@reduxjs/toolkit';
import { PLACE_OPTIONS } from '../const';

export const setCity = createAction<string>('offers/setCity');
export const setActiveSort = createAction<typeof PLACE_OPTIONS[number]>('offers/setActiveSort');
