import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TOffers } from '../components/offer-card/types';
import { APIRoute } from '../const';

export const fetchOfferAction = createAsyncThunk<TOffers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOffers', async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffers>(APIRoute.Offers);
    return data;
  },
);
