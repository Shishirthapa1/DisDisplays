import { verify } from "crypto";
import { baseApi } from "../../restBaseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/users/login",
        body,
        method: "POST",
      }),
    }),
    sendEmail: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/users/send-email",
        body,
        method: "POST",
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body: { email: string; otp: string }) => ({
        url: "/users/verify-otp",
        body,
        method: "POST",
      }),
      invalidatesTags: ["UserById"],
    }),
    changePassword: builder.mutation({
      query: (body: {
        email: String;
        currentPassword: string;
        newPassword: string;
      }) => ({
        url: "/users/change-password",
        body,
        method: "POST",
      }),
      invalidatesTags: ["UserById"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSendEmailMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
} = authApi;
