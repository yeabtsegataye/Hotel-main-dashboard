import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    
    addbills: builder.mutation({
      query: ({ token, credentials }) => ({ // ✅ Destructure credentials
        url: "/bills/add",
        method: "POST",
        body: {...credentials}, // ✅ Send the fields directly
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure JSON format
        },
        credentials: "include",
      }),
    }),
    
    addcategory: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/cat/add",
        method: "POST",
        body: { ...credentials}, // Use the received credentials correctly
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
    ////////////////////////////
    addemployee: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/employee/add",
        method: "POST",
        body: {...credentials}, // Use the received credentials correctly
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
      getemployee: builder.query({
        query: (token) => ({
          url: "/employee",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }),
      }), 
      //////////////////////////////  
  })
})

export const {
  useAddbillsMutation,
  useGetbillsQuery,
  useAddcategoryMutation,
  useAddemployeeMutation,
  useGetemployeeQuery
} = authApiSlice;
