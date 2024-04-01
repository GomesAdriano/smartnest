import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICategoriaDispositivo {
    id: number;
    categoria: string;
}

type CategoriaResponse = ICategoriaDispositivo[];

export const categoriaApi = createApi({
    reducerPath: 'categoriaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['CatDisp'],
    endpoints: (build) => ({
        getCategoriasDispositivo: build.query<CategoriaResponse, void>({
            query: () => 'categoria-dispositivo',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'CatDisp' as const, id })),
                          { type: 'CatDisp', id: 'LIST' },
                      ]
                    : [{ type: 'CatDisp', id: 'LIST' }],
        }),
        getCategoriaDispositivo: build.query<ICategoriaDispositivo, number>({
            query: (id) => `categoria-dispositivo/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'CatDisp', id }],
        }),
    }),
});

export const { useGetCategoriasDispositivoQuery, useGetCategoriaDispositivoQuery } = categoriaApi;
