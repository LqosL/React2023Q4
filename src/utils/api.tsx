// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//
// const url = 'https://openlibrary.org/search.json?q=';
//
//     export const api = createApi({
//         reducerPath: 'api',
//         endpoints: (builder) => ({
//             search: builder.query({
//                 query: ({query, page, count} : URLSearchParams
//
//             });
//
//             getUsers: (builder.query({
//                 queryFn: async (arg) => {
//                     try {
//                         const response = await fetch(url + 'users');
//                         return {data: await response.json() };
//                     } catch (e) {
//                         return { error: e.message };
//                     }
//                 },
//             }),
//         }),
//     });
// });
// export const { useGetUsersQuery,  useGetUserQuery, useGetPostQuery } = api;
