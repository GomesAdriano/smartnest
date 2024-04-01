import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ITipoComodo {
    id: number;
    tipo: string;
}

type TipoComodoResponse = ITipoComodo[];

export const tipoComodoApi = createApi({
    reducerPath: 'tipoComodoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['tipoComo'],
    endpoints: (build) => ({
        getTiposComodo: build.query<TipoComodoResponse, void>({
            query: () => 'tipo-comodo',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'tipoComo' as const, id })),
                          { type: 'tipoComo', id: 'LIST' },
                      ]
                    : [{ type: 'tipoComo', id: 'LIST' }],
        }),
        getTipoComodo: build.query<ITipoComodo, number>({
            query: (id) => `tipo-comodo/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'tipoComo', id }],
        }),
    }),
});

export const { useGetTiposComodoQuery, useGetTipoComodoQuery } = tipoComodoApi;
