import { createReducer } from '@reduxjs/toolkit';
import { CITIES, PLACE_OPTIONS } from '../const';
import { OfferMocks } from '../mocks/offer-mocks';
import { setActiveSort, setCity } from './action';
import { TOffer } from '../components/offer-card/types';

type TInitialState = {
  city: string;
  offers: TOffer[];
  activeSort: typeof PLACE_OPTIONS[number];
}

const initalState: TInitialState = {
  city: CITIES[0],
  offers: OfferMocks,
  activeSort: PLACE_OPTIONS[0],
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSort, (state, action) => {
      state.activeSort = action.payload;
    });
});
