import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<RootStore>(makeStore);
