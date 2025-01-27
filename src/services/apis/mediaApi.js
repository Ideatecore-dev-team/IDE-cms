import apiSlice from "./apiSlice";

const mediaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    getMedia: builder.query({
      query: (params) => ({
        url: "/media",
        method: "GET",
        params,
      }),

      providesTags: ["Media"],
    }),

    deleteMedia: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "DELETE",
        body: data,
      }),

      invalidatesTags: ["Media"],
    }),
  }),
});

export const {
  useUploadMediaMutation,
  useGetMediaQuery,
  useDeleteMediaMutation,
} = mediaApi;
