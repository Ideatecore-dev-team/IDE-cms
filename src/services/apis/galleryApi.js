import apiSlice from "./apiSlice";

const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query({
      query: () => ({
        url: `/gallery`,
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),

    updateGalleryById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/gallery/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const { useGetGalleriesQuery, useUpdateGalleryByIdMutation } =
  galleryApi;
