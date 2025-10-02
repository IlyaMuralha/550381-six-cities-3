import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offers';

export const api = createAPI();

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
