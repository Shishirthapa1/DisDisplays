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

    getProductsByCategory: builder.query<any, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `products/category/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["ProductsByCategory"],
    }),

    getProductById: builder.query<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `products/${productId}`,
        method: "GET",
      }),
      providesTags: ["ProductById"],
    }),

    getAllOrders: builder.query<any, void>({
      query: () => ({
        url: "order",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["OrderById"],
    }),

    getUserById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["UserById"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetUserByIdQuery,
  useGetProductsByCategoryQuery,
} = queryApi;
