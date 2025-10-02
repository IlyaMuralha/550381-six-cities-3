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
  initialState,
  name: 'offer',
  reducers: {
    clear(state) {
      state.offerDetails = null;
      state.nearOffers = [];
    }
  },
});

const offerAction = offerSlice.actions;

export { offerAction, offerSlice };
