import apiSlice from "./apiSlice";

const teamCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeamCategory: builder.query({
      query: () => ({
        url: "/teamcategory",
        method: "GET",
      }),
      providesTags: ["Teamcategory"],
    }),

    getTeamCategoryById: builder.query({
      query: (id) => ({
        url: `/teamcategory/${id}`,
        method: "GET",
      }),
      providesTags: ["Teamcategory"],
    }),

    createTeamCategory: builder.mutation({
      query: (data) => ({
        url: "/teamcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teamcategory"],
    }),

    updateTeamCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teamcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teamcategory"],
    }),

    deleteTeamCategory: builder.mutation({
      query: (id) => ({
        url: `/teamcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teamcategory"],
    }),
  }),
});

export const {
  useGetAllTeamCategoryQuery,
  useGetTeamCategoryByIdQuery,
  useCreateTeamCategoryMutation,
  useUpdateTeamCategoryMutation,
  useDeleteTeamCategoryMutation,
} = teamCategoryApi;
