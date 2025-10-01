import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { TOffers } from '../components/offer-card/types';
import { APIRoute } from '../const';
import { offersAction } from './slices/offers';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(offersAction.setOffersDataLoadingStatus(true));
    const { data } = await api.get<TOffers>(APIRoute.Offers);
    dispatch(offersAction.setOffersDataLoadingStatus(false));
    dispatch(offersAction.loadOffers(data));
  },
);
