import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserDetailsState {
  token: string,
  user_id: string,
  role_id: string,
  trainee_id:string,
  user_name:string,
}
const initialState: UserDetailsState = {
  token: '',
  user_id: '',
  role_id: '',
  trainee_id:'',
  user_name:'',

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
      state.user_name=action.payload.user_name;
    },
  },
});

export const {userDetails} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;