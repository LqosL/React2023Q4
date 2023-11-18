import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SearchQueryParams = {
  query: string;
  page: number;
  count: number;
};

export type GetDetailsQueryParams = {
  key: string;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://openlibrary.org/',
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ query, page, count }: SearchQueryParams) => {
        return `search.json?q=${query}&page=${page}&limit=${count}`;
      },
    }),
    details: builder.query({
      query: ({ key }: GetDetailsQueryParams) => {
        return `works/${key}.json`;
      },
    }),
  }),
});
export const { useSearchQuery, useDetailsQuery } = api;
