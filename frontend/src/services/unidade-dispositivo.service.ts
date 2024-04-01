import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDispositivo } from './dispositivo.service';
import { IUnidadeComodo } from './comodo.service';
import { IAutomatizacao } from './automatizacao.service';

export interface IUnidadeDispositivo {
    id: string;
    descricao: string;
    status: boolean;
    dispositivo: IDispositivo;
    comodo: IUnidadeComodo;
    automatizacao: IAutomatizacao[];
}

type UnidadeDispositivoResponse = IUnidadeDispositivo[];

export const unidadeDispositivoApi = createApi({
    reducerPath: 'unidadeDispositivoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['undDisp'],
    endpoints: (build) => ({
        getUnidadesDispositivo: build.query<UnidadeDispositivoResponse, void>({
            query: () => 'unidade-dispositivo',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'undDisp' as const, id })),
                          { type: 'undDisp', id: 'LIST' },
                      ]
                    : [{ type: 'undDisp', id: 'LIST' }],
        }),
        addUnidadeDispositivo: build.mutation<
            IUnidadeDispositivo,
            { descricao: string; dispositivoId: number }
        >({
            query: (body) => ({
                url: `unidade-dispositivo`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'undDisp', id: 'LIST' }],
        }),
        getUnidadeDispositivo: build.query<IUnidadeDispositivo, string>({
            query: (id) => `unidade-dispositivo/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'undDisp', id }],
        }),
        updateUnidadeDispositivo: build.mutation<
            void,
            Pick<IUnidadeDispositivo, 'id'> & { body: { descricao: string; dispositivoId: number } }
        >({
            query: ({ id, body }) => ({
                url: `unidade-dispositivo/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'undDisp', id }],
        }),
        updateStatus: build.mutation<
            void,
            Pick<IUnidadeDispositivo, 'id'> & Pick<IUnidadeDispositivo, 'status'>
        >({
            query: ({ id, ...patch }) => ({
                url: `unidade-dispositivo/status/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'undDisp', id }],
        }),
        deleteUnidadeDispositivo: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `unidade-dispositivo/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (_result, _error, id) => [{ type: 'undDisp', id }],
        }),
    }),
});

export const {
    useGetUnidadesDispositivoQuery,
    useGetUnidadeDispositivoQuery,
    useAddUnidadeDispositivoMutation,
    useUpdateUnidadeDispositivoMutation,
    useUpdateStatusMutation,
    useDeleteUnidadeDispositivoMutation,
} = unidadeDispositivoApi;
