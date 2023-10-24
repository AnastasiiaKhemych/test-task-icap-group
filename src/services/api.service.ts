import { baseApi } from "./base.api";
import { Data, Post } from "../types/Response";

export const apiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, any>({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
    }),
    getInfo: build.query<Data, { limit?: number; page: number }>({
      query: ({ limit = 10, page }) => {
        const params = new URLSearchParams();
        if (page) {
          params.append("offset", (page * limit).toString());
        }

        if (limit) {
          params.append("limit", limit.toString());
        }

        return { url: `/table/?${params.toString()}` };
      },
      providesTags: ["Post"],
    }),
    updateInfo: build.mutation<Post, Post>({
      query: ({ id, ...body }) => ({
        url: `/table/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useLoginMutation, useUpdateInfoMutation, useGetInfoQuery } =
  apiService;
