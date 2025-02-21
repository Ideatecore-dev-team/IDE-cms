import apiSlice from "./apiSlice";

const subscribeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscribe: builder.query({
      query: (query) => ({
        url: "/subscribe",
        method: "GET",
        params: query,
      }),
      providesTags: ["Subscribe"],
    }),

    deleteSubscribe: builder.mutation({
      query: (id) => ({
        url: `subscribe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscribe"],
    }),
  }),
});

export const { useGetAllSubscribeQuery, useDeleteSubscribeMutation } =
  subscribeApi;
