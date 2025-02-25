import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addbills: builder.mutation({
      query: ({ token, credentials }) => ({
        // ✅ Destructure credentials
        url: "/bills/add",
        method: "POST",
        body: { ...credentials }, // ✅ Send the fields directly
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure JSON format
        },
        credentials: "include",
      }),
    }),

    addcategory: builder.mutation({
      query: ({ token, credentials }) => {
        // const formData = new FormData();
    
        // // Append the data from credentials into formData
        // formData.append("categoryName", credentials.categoryName);
        // formData.append("categoryType", credentials.categoryType);
        // formData.append("description", credentials.description);
        // formData.append("status", credentials.status);
        // formData.append("image", credentials.image); // Append the image file
    
        return {
          url: "/cat/add",
          method: "POST",
          body: credentials, // Send FormData to backend
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set "Content-Type", as the browser will do this for you.
          },
          credentials: "include",
        };
      },
    }),
 ///////////////////////////////////   
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
        body: { ...credentials }, // Use the received credentials correctly
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
  }),
});

export const {
  useAddbillsMutation,
  useGetbillsQuery,
  useAddcategoryMutation,
  useAddemployeeMutation,
  useGetemployeeQuery,
} = authApiSlice;
