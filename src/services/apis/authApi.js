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
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/getuser",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/changepassword",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
