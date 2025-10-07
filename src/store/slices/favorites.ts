import { createSlice } from '@reduxjs/toolkit';
import { TOffers } from '../../components/offer-card/types';
import { FavoriteStatus, RequestStatus } from '../../const';
import { changeFavorites, fetchFavorites } from '../api-actions';

export type TFavoritesState = {
  favorites: TOffers;
  status: RequestStatus;
}

const initialState: TFavoritesState = {
  favorites: [],
  status: RequestStatus.Idle
};

function processFailed(state: TFavoritesState) {
  state.status = RequestStatus.Failed;
}

function processLoading(state: TFavoritesState) {
  state.status = RequestStatus.Loading;
}

const favoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, processLoading)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFavorites.rejected, processFailed)
      .addCase(changeFavorites.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case FavoriteStatus.Added:
            state.favorites.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.favorites = state.favorites.filter(({ id }) => id !== action.payload.offer.id);
        }
      })
      .addCase(changeFavorites.pending, processLoading)
      .addCase(changeFavorites.rejected, processFailed);
  },
  selectors: {
    favoritesStatus: (state: TFavoritesState) => state.status,
    favorites: (state: TFavoritesState) => state.favorites
  }
});

const favoritesAction = favoritesSlice.actions;
const favoritesSelectors = favoritesSlice.selectors;

export {
  favoritesSlice,
  favoritesAction,
  favoritesSelectors
};
