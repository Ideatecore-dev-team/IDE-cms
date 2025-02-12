import apiSlice from "./apiSlice";

const partnerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPartner: builder.query({
      query: () => ({
        url: "/partner",
        method: "GET",
      }),
      providesTags: ["Partner"],
    }),

    getPartnerById: builder.query({
      query: (id) => ({
        url: `/partner/${id}`,
        method: "GET",
      }),
      providesTags: ["Partner"],
    }),

    createPartner: builder.mutation({
      query: (data) => ({
        url: `/partner`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Partner"],
    }),

    updatePartner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Partner"],
    }),

    deletePartner: builder.mutation({
      query: (id) => ({
        url: `/partner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
});

export const {
  useGetAllPartnerQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
