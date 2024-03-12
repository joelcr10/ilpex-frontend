import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserNameState {

  user_name:string,
}
const initialState: UserNameState = {

  user_name:'',
};
export const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    userNames(state: UserNameState, action: PayloadAction<string>) {

      state.user_name=action.payload;
    },
  },
});

export const {userNames} = userNameSlice.actions;
export default userNameSlice.reducer;