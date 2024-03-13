import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQRES_API_URL } from "../endpoints";

export const reqresApiSlice = createApi({
  reducerPath: "reqresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REQRES_API_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: () => ({}),
});
