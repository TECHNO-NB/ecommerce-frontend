import { createSlice } from "@reduxjs/toolkit";

const modalSLice = createSlice({

  name: "modal",
  initialState: false,
  reducers: {
      // @ts-ignore
    openModal: (state,action) => {
      return true;
    },
  },
});

export const { openModal } = modalSLice.actions;
export default modalSLice.reducer;
