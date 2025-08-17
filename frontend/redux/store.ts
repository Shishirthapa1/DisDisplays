import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/restBaseApi";
import configUser from "./slices/configUser";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    configUser,
    cart: cartSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
