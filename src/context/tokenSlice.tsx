import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenState {
  token: string,
  user_id: string,
  role_id: number,
  
}
const initialState: TokenState = {
  token: '',
  user_id: '',
  role_id: 0,
};
export const userTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    userToken(state: TokenState, action: PayloadAction<TokenState>) {
      
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.role_id = action.payload.role_id;
    },
  },
});

export const {userToken} = userTokenSlice.actions;
export default userTokenSlice.reducer;