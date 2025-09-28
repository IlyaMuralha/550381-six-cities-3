import { createReducer } from '@reduxjs/toolkit';
import { CITIES, PLACE_OPTIONS } from '../const';
// import { OfferMocks } from '../mocks/offer-mocks';
import { loadOffers, setActiveSort, setCity, setOffersDataLoadingStatus } from './action';
import { TOffers } from '../components/offer-card/types';

type TInitialState = {
  city: string;
  offers: TOffers;
  activeSort: typeof PLACE_OPTIONS[number];
  isOffersDataLoading: boolean;
}

const initalState: TInitialState = {
  city: CITIES[0].name,
  // offers: OfferMocks,
  offers: [],
  activeSort: PLACE_OPTIONS[0],
  isOffersDataLoading: false,
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSort, (state, action) => {
      state.activeSort = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
