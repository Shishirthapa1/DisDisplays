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
  }),
});

export const { useLoginMutation } = authApi;
