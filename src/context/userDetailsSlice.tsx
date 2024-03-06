import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserDetailsState {
  token: string,
  user_id: number|string,
  role_id: number|string,
  trainee_id:number|string,
}
const initialState: UserDetailsState = {
  token: '',
  user_id: 100,
  role_id: 0,
  trainee_id:0,
};
export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userDetails(state: UserDetailsState, action: PayloadAction<UserDetailsState>) {
      console.log("action payload",action.payload);
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.role_id = action.payload.role_id;
      state.trainee_id=action.payload.trainee_id;
    },
  },
});

export const {userDetails} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;