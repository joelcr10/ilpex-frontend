import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    tokenReducer
  },
});
 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;