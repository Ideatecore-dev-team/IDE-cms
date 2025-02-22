import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3001",
    baseUrl: "https://api.theideindonesia.id",
    // credentials: "include",
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        const { token } = JSON.parse(userInfo);
        // console.log(token);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});

export default apiSlice;
