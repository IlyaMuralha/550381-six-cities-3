import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOffers, TOfferDetails } from '../../components/offer-card/types';
import { RequestStatus } from '../../const';
import { fetchNearOffers, fetchOffer } from '../api-actions';

export type TOfferState = {
  offerDetails: TOfferDetails | null;
  nearOffers: TOffers;
  status: RequestStatus;
}

const initialState: TOfferState = {
  offerDetails: null,
  nearOffers: [],
  status: RequestStatus.Idle
};

const offerSlice = createSlice({
  initialState,
  name: 'offer',
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<TOfferDetails>) => {
        state.status = RequestStatus.Success;
        state.offerDetails = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action: PayloadAction<TOffers>) => {
        state.nearOffers = action.payload;
      }),
  selectors: {
    offerDetails: (state: TOfferState) => state.offerDetails,
    nearOffers: (state: TOfferState) => state.nearOffers,
    statusOffer: (state: TOfferState) => state.status
  }
});

const offerAction = offerSlice.actions;
const offerSelectors = offerSlice.selectors;

export {
  offerAction,
  offerSlice,
  offerSelectors
};
