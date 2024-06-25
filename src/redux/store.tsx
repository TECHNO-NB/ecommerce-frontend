import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import productReducer from "./ProductSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import ModalSlice from "./ModalSlice";


// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "product"],
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  modal:ModalSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Export the store and persistor
export { store };
export const persistor = persistStore(store);

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
