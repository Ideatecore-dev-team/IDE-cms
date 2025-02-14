import apiSlice from "./apiSlice";

const metricVisitor = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMetric: builder.query({
      query: () => ({
        url: "/metric",
        method: "GET",
      }),
      providesTags: ["Metric"],
    }),
  }),
});
export const { useGetAllMetricQuery } = metricVisitor;
