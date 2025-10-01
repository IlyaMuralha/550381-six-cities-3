import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, PLACE_OPTIONS } from '../../const';
import { TOffers } from '../../components/offer-card/types';

type TInitialState = {
  city: string;
  offers: TOffers;
  activeSort: typeof PLACE_OPTIONS[number];
  isOffersDataLoading: boolean;
}

const initialState: TInitialState = {
  city: CITIES[0].name,
  offers: [],
  activeSort: PLACE_OPTIONS[0],
  isOffersDataLoading: false,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<typeof PLACE_OPTIONS[number]>) => {
      state.activeSort = action.payload;
    },
    loadOffers: (state, action: PayloadAction<TOffers>) => {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
  },
});

const offersAction = offersSlice.actions;

export { offersAction, offersSlice };
