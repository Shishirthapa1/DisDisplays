import {
  CreateOrderPayload,
  CreateOrderResponse,
  CreatePaymentIntentResponse,
} from "@/types/product";
import { baseApi } from "../../restBaseApi";
import { CreateContactPayload, CreateContactResponse } from "@/types/contact";

const otherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (formData: any) => ({
        url: `categories`,
        body: formData,
        method: "POST",
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }: { id: string; formData: any }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    createProduct: builder.mutation({
      query: (formData: any) => ({
        url: `products`,
        body: formData,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }: { id: string; formData: any }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    createPaymentIntent: builder.mutation<CreatePaymentIntentResponse, number>({
      query: (amount) => ({
        url: `payments/create-payment-intent`,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: { amount },
      }),
    }),
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, formData }: { id: string; formData: any }) => ({
        url: `order/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateShipping: builder.mutation({
      query: ({
        id,
        cost,
        estimatedDays,
      }: {
        id: string;
        cost: number;
        estimatedDays: number;
      }) => ({
        url: `shipping/${id}`,
        method: "PUT",
        body: { cost, estimatedDays },
      }),
      invalidatesTags: ["ShippingInfo"],
    }),
    createContact: builder.mutation<
      CreateContactResponse,
      CreateContactPayload
    >({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateShippingMutation,
  useCreateContactMutation,
} = otherApi;
