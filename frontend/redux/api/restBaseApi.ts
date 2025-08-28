import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import Cookies from "js-cookie";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI as string,
    prepareHeaders: (headers, { getState }) => {
      // const cookies = localStorage.getItem('token');
      const cookies = Cookies.get("userToken");
      const state = getState() as RootState;
      const token = state.configUser?.token;

      if (token || cookies) {
        headers.set("authorization", `Bearer ${token || cookies}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Categories",
    "Products",
    "ProductById",
    "Orders",
    "OrderById",
    "UserById",
    "ProductsByCategory",
    "ShippingInfo",
  ],
  endpoints: () => ({}),
});
