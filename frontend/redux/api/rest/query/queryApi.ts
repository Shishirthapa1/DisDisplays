/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../restBaseApi";

const queryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    getCategoryById: builder.query<any, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `categories/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    getAllProducts: builder.query<any, void>({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getProductById: builder.query<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `products/${productId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = queryApi;
