import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import userDetailsReducer from './userDetailsSlice'

export const store = configureStore({
  reducer: {
    userReducer,
    tokenReducer,
    userDetailsReducer,
  },
});
 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;