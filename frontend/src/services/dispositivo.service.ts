import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoriaDispositivo } from './categoria-dispositivo.service';

export interface IDispositivo {
    id: number;
    dispositivo: string;
    categoriaDispositivo: ICategoriaDispositivo;
}

type DispositivoResponse = IDispositivo[];

export const dispositivoApi = createApi({
    reducerPath: 'dispositivoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['Disp'],
    endpoints: (build) => ({
        getDispositivos: build.query<DispositivoResponse, void>({
            query: () => 'dispositivo',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Disp' as const, id })),
                          { type: 'Disp', id: 'LIST' },
                      ]
                    : [{ type: 'Disp', id: 'LIST' }],
        }),
        getDispositivosPorCategoria: build.query<DispositivoResponse, number>({
            query: (id) => `dispositivo/categoria/${id}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Disp' as const, id })),
                          { type: 'Disp', id: 'LIST' },
                      ]
                    : [{ type: 'Disp', id: 'LIST' }],
        }),
        getDispositivo: build.query<DispositivoResponse, number>({
            query: (id) => `dispositivo/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Disp', id }],
        }),
    }),
});

export const {
    useGetDispositivosQuery,
    useGetDispositivoQuery,
    useGetDispositivosPorCategoriaQuery,
} = dispositivoApi;
