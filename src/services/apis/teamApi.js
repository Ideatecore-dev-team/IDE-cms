import apiSlice from "./apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: (query) => ({
        url: "/team",
        method: "GET",
        params: query,
      }),
      providesTags: ["Team"],
    }),

    getTeamById: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),

    createTeam: builder.mutation({
      query: (data) => ({
        url: "/team",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/team/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
