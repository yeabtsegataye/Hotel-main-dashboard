import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logouts: builder.mutation({
      query: () => ({
        url: "/auth/log-out",
        method: "POST",
        body: {},
      }),
    }),
    dlogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/Dash_login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
    verifyToken: builder.mutation({
      query: ({ token }) => ({
        url: "/auth/verify-token",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useVerifyTokenMutation,
  useDloginMutation,
  useLogoutsMutation
} = authApiSlice;
