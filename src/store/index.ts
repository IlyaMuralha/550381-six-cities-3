import { configureStore } from '@reduxjs/toolkit';
// import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offers';

export const api = createAPI();

export const store = configureStore({
  reducer: offersSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
