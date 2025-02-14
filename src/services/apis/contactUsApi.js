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
  }),
});

export const { useGetAllContactUsQuery } = contactUsApi;
