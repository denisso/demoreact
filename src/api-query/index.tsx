/**
 * @description For queries with cache
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiQuery = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    reducerPath: "apiQuery",
    endpoints: (builder) => ({
        getNote: builder.query<any, string | undefined>({
            query: (slug) => `/note/${slug}`,
        }),
        getNotesList: builder.query<any, number>({
            query: (page) => `/notes/${page}`,
        }),
        getPage: builder.query<any, string>({
            query: (slug) => `/page/${slug}`,
        }),
    }),
});

export const {
    useGetNoteQuery,
    useLazyGetNotesListQuery,
    useGetNotesListQuery,
    useGetPageQuery,
} = apiQuery;
