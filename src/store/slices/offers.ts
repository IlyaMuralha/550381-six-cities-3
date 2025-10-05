import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, PLACE_OPTIONS, RequestStatus } from '../../const';
import { TOffers } from '../../components/offer-card/types';
import { fetchOfferAction } from '../api-actions';

export type TInitialState = {
  city: string;
  offers: TOffers;
  activeSort: typeof PLACE_OPTIONS[number];
  isOffersDataLoading: boolean;
  status: RequestStatus;
}

const initialState: TInitialState = {
  city: CITIES[0].name,
  offers: [],
  activeSort: PLACE_OPTIONS[0],
  isOffersDataLoading: false,
  status: RequestStatus.Idle
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
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchOfferAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  selectors: {
    city: (state: TInitialState) => state.city,
    offers: (state: TInitialState) => state.offers,
    statusOffers: (state: TInitialState) => state.status,
    activeSort: (state: TInitialState) => state.activeSort,
    isOffersDataLoading: (state: TInitialState) => state.isOffersDataLoading,
  }
});

const offersAction = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export {
  offersAction,
  offersSlice,
  offersSelectors
};
