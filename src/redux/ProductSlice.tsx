import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProducts {
  _id: string;
  product: string;
  image: string;
  price: number;
}

const productSlice = createSlice({
  name: "product",
  initialState: [] as IProducts[],
  reducers: {
    addProductsTOCard: (state, action: PayloadAction<IProducts>) => {
      const existedProducts = state.some(
        (val) => val._id === action.payload._id
      );
      if (!existedProducts) {
        state.push(action.payload);
      }
    },
    deleteProducts: (state, action) => {
        console.log(action.payload)
      return state.filter((val:IProducts): boolean => {
        return val._id !== action.payload;
      });
    },
  },
});

export const { addProductsTOCard, deleteProducts } = productSlice.actions;
export default productSlice.reducer;
