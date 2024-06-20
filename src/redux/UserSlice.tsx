import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  id: "",
  fullName: "",
  email: "",
  role: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
  

  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
