import apiSlice from "./apiSlice";

const programApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProgram: builder.query({
      query: (query) => ({
        url: "/program",
        method: "GET",
        params: query,
      }),
      providesTags: ["Program"],
    }),

    getProgramById: builder.query({
      query: (id) => ({
        url: `/program/${id}`,
        method: "GET",
      }),
      providesTags: ["Program"],
    }),

    createProgram: builder.mutation({
      query: (data) => ({
        url: "/program",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Program"],
    }),

    updateProgram: builder.mutation({
      query: ({ id, data }) => ({
        url: `/program/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Program"],
    }),

    deleteProgram: builder.mutation({
      query: (id) => ({
        url: `/program/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Program"],
    }),
  }),
});

export const {
  useCreateProgramMutation,
  useGetAllProgramQuery,
  useGetProgramByIdQuery,
  useDeleteProgramMutation,
  useUpdateProgramMutation,
} = programApi;
