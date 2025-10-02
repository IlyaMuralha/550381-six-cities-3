import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TReview } from '../../components/review/types';
import { RequestStatus } from '../../const';
import { fetchComments, postComment } from '../api-actions';

export type TReviewsState = {
  reviews: TReview[];
  status: RequestStatus;
}

const initialState: TReviewsState = {
  reviews: [],
  status: RequestStatus.Idle
};

const reviewsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<TReview[]>) => {
        state.status = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postComment.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<TReview>) => {
        state.status = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'reviews',
  reducers: {},
});

const reviewsAction = reviewsSlice.actions;

export { reviewsAction, reviewsSlice };
