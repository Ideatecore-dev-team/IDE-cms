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

    createMetricVisit: builder.mutation({
      query: (data) => ({
        url: "metric/visit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Metric"],
    }),
  }),
});
export const { useGetAllMetricQuery, useCreateMetricVisitMutation } =
  metricVisitor;
