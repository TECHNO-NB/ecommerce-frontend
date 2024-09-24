import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import productReducer from "./ProductSlice";
import ModalSlice from "./ModalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["product", "modal"], 
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer, 
  product: productReducer,
  modal: ModalSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Export the store and persistor
export const persistor = persistStore(store);

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export { store };
