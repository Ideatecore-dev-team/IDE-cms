import apiSlice from "./apiSlice";

const contactUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactUs: builder.query({
      query: () => ({
        url: "/contactus",
        method: "GET",
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
