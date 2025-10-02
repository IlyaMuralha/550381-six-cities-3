import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TOfferDetails, TOffers } from '../components/offer-card/types';
import { APIRoute } from '../const';
import { TReview } from '../components/review/types';

export const fetchOfferAction = createAsyncThunk<TOffers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOffers', async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<TOfferDetails, string, {
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails', async (offerId, { extra: api }) => {
    const { data } = await api.get<TOfferDetails>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearOffers = createAsyncThunk<TOffers, string, {
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers', async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<TReview[], TOfferDetails['id'], {
  extra: AxiosInstance;
}>(
  'data/fetchComments', async (offerId, { extra: api }) => {
    const { data } = await api.get<TReview[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export type PostCommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: TOfferDetails['id'];
}

export const postComment = createAsyncThunk<TReview, PostCommentProps, {
  extra: AxiosInstance;
}>(
  'data/postComment', async ({ body, offerId }, { extra: api }) => {
    const { data } = await api.post<TReview>(`${APIRoute.Comments}/${offerId}`, body);
    return data;
  },
);
