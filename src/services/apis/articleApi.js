import apiSlice from "./apiSlice";

const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticle: builder.query({
      query: (query) => ({
        url: "/article",
        method: "GET",
        params: query,
      }),
      providesTags: ["Article"],
    }),

    getArticleById: builder.query({
      query: (id) => ({
        url: `/article/${id}`,
        method: "GET",
      }),
      providesTags: ["Article"],
    }),

    createArticle: builder.mutation({
      query: (data) => ({
        url: "/article",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),

    updateArticle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/article/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useGetAllArticleQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
