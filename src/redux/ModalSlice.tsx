import { createSlice } from "@reduxjs/toolkit";

const modalSLice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    openModal: (state,payload) => {
      return true;
    },
  },
});

export const { openModal } = modalSLice.actions;
export default modalSLice.reducer;
