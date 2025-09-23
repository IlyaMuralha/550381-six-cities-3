import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { OfferMocks } from '../mocks/offer-mocks';
import { setCity } from './action';

const initalState = {
  city: CITIES[0],
  offers: OfferMocks,
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});
