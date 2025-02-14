import apiSlice from "./apiSlice";

const companyInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfo: builder.query({
      query: () => ({
        url: "/companyinfo",
        method: "GET",
      }),
      providesTags: ["CompanyInfo"],
    }),

    updateCompanyInfo: builder.mutation({
      query: ({ data }) => ({
        url: "/companyinfo",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CompanyInfo"],
    }),
  }),
});

export const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation } =
  companyInfoApi;
