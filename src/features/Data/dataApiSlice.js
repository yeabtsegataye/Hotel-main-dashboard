import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    
    addbills: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/bills/add",
        method: "POST",
        body: { credentials}, // Use the received credentials correctly
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
    getbills: builder.query({
      query: (token) => ({
        url: "/bills",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),    
  })
})

export const {
  useAddbillsMutation,
  useGetbillsQuery
} = authApiSlice;
