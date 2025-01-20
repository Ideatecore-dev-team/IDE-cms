import apiSlice from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/getuser",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
