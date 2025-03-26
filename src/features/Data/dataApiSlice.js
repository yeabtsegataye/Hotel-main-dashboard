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
    ///////////////////////////////////

    addcategory: builder.mutation({
      query: ({ token, credentials }) => {
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

    getcat: builder.query({
      query: (token) => ({
        url: "/cat/get",
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

    addfood: builder.mutation({
      query: ({ token, credentials }) => {
        return {
          url: "/food/add",
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

    //////////////////////////////
    getfood: builder.query({
      query: ({ token, id }) => ({
        url: `/food/get/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),

    ////////////////////////////

    addingredient: builder.mutation({
      query: ({ token, credentials }) => {
        return {
          url: "/ingredient/add",
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
    fetchIngredients: builder.query({
      query: (token) => ({
        url: "/ingredient",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      credentials: "include",
    }),
    deleteIngredient: builder.mutation({
      query: ({ token, id }) => ({
        url: `/ingredient/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      credentials: "include",
    }),
    updateIngredient: builder.mutation({
      query: ({ token, id, updatedData }) => ({
        url: `/ingredient/${id}`,
        method: "PATCH",
        body: updatedData,
        headers: { Authorization: `Bearer ${token}` },
      }),
      credentials: "include",
    }),
    getIngredientsByFood: builder.query({
      query: ({ token, foodId }) => ({
        url: `/ingredient/food/${foodId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      credentials: "include",
    }),
    //////////////////////
  }),
});

export const {
  useAddbillsMutation,
  useGetbillsQuery,
  useAddcategoryMutation,
  useAddemployeeMutation,
  useGetemployeeQuery,
  useGetcatQuery,
  useAddfoodMutation,
  useGetfoodQuery,
  useAddingredientMutation,
  useFetchIngredientsQuery,
  useDeleteIngredientMutation,
  useUpdateIngredientMutation,
  useGetIngredientsByFoodQuery
} = authApiSlice;
