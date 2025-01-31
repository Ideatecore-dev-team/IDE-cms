import apiSlice from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserPasswordById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}/password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useUpdateUserPasswordByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
