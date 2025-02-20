import apiSlice from "./apiSlice";

const contactUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactUs: builder.query({
      query: (query) => ({
        url: "/contactus",
        method: "GET",
        params: query,
      }),
      providesTags: ["ContactUs"],
    }),

    deleteContactUs: builder.mutation({
      query: (id) => ({
        url: `contactus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const { useGetAllContactUsQuery, useDeleteContactUsMutation } =
  contactUsApi;
