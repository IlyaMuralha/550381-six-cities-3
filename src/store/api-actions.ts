import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TOfferDetails, TOffers } from '../components/offer-card/types';
import { APIRoute, FavoriteStatus } from '../const';
import { TReview } from '../components/review/types';
import { TUser } from '../types/user';
import { dropToken, saveToken } from '../services/token';

export type PostCommentPayload = {
  comment: string;
  rating: number;
  offerId: TOfferDetails['id'];
}

export type LoginData = {
  email: string;
  password: string;
}

export type ChangeFavorites = {
  offerId: string;
  status: FavoriteStatus;
}

export type ChangeResponse = {
  offer: TOfferDetails;
  status: FavoriteStatus;
}

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

export const postComment = createAsyncThunk<TReview, PostCommentPayload, {
  extra: AxiosInstance;
}>(
  'data/postComment', async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<TReview>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
  },
);

export const checkAuth = createAsyncThunk<TUser, undefined, {
  extra: AxiosInstance;
}>(
  'auth/checkAuth', async (_arg, { extra: api }) => {
    const { data } = await api.get<TUser>(APIRoute.Login);
    return data;
  },
);

export const login = createAsyncThunk<TUser, LoginData, {
  extra: AxiosInstance;
}>(
  'auth/login', async (body, { extra: api }) => {
    const { data } = await api.post<TUser>(APIRoute.Login, body);
    saveToken(data.token);
    return data;
  },
);

export const logout = createAsyncThunk<unknown, undefined, {
  extra: AxiosInstance;
}>(
  'auth/logout', async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchFavorites = createAsyncThunk<TOffers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchFavorites', async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffers>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavorites = createAsyncThunk<ChangeResponse, ChangeFavorites, {
  extra: AxiosInstance;
}>(
  'data/changeFavorites', async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<TOfferDetails>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return { offer: data, status };
  },
);
