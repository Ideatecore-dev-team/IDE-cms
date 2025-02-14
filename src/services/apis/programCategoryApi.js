import apiSlice from "./apiSlice";

const programCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProgramCategory: builder.query({
      query: () => ({
        url: "/programcategory",
        method: "GET",
      }),
      providesTags: ["ProgramCategory"],
    }),

    getProgramCategoryById: builder.query({
      query: (id) => ({
        url: `/programcategory/${id}`,
        method: "GET",
      }),
      providesTags: ["ProgramCategory"],
    }),

    createProgramCategory: builder.mutation({
      query: (data) => ({
        url: "/programcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProgramCategory"],
    }),

    updateProgramCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/programcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProgramCategory"],
    }),

    deleteProgramCategory: builder.mutation({
      query: (id) => ({
        url: `/programcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProgramCategory"],
    }),
  }),
});

export const {
  useGetAllProgramCategoryQuery,
  useGetProgramCategoryByIdQuery,
  useCreateProgramCategoryMutation,
  useUpdateProgramCategoryMutation,
  useDeleteProgramCategoryMutation,
} = programCategoryApi;
