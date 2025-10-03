import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { TUser } from '../../types/user';
import { checkAuth, login, logout } from '../api-actions';

export type TUserState = {
  user: TUser | null;
  requestStatus: RequestStatus;
  status: AuthorizationStatus;
}

const initialState: TUserState = {
  user: null,
  requestStatus: RequestStatus.Idle,
  status: AuthorizationStatus.Unknown
};

function processSuccess(state: TUserState, action: PayloadAction<TUser>) {
  state.user = action.payload;
  state.requestStatus = RequestStatus.Success;
  state.status = AuthorizationStatus.Auth;
}

function processFailed(state: TUserState) {
  state.requestStatus = RequestStatus.Failed;
  state.status = AuthorizationStatus.NoAuth;
}

function processLoading(state: TUserState) {
  state.requestStatus = RequestStatus.Loading;
}

const userSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(checkAuth.pending, processLoading)
      .addCase(checkAuth.fulfilled, processSuccess)
      .addCase(checkAuth.rejected, processFailed)
      .addCase(login.pending, processLoading)
      .addCase(login.fulfilled, processSuccess)
      .addCase(login.rejected, processFailed)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = AuthorizationStatus.NoAuth;
      }),
  initialState,
  name: 'user',
  reducers: {},
});

const userAction = userSlice.actions;

export { userAction, userSlice };
