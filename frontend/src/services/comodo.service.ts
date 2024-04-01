import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITipoComodo } from './tipo-comodo.service';
import { IUnidadeDispositivo } from './unidade-dispositivo.service';
import { IRotina } from './rotina.service';

export interface IUnidadeComodo {
    id: string;
    descricao: string;
    tipoComodo: ITipoComodo;
    unidadeDispositivo: IUnidadeDispositivo[];
    rotina: IRotina[];
    integrados?: string[];
}

export enum acoes {
    ADICIONAR = 'add',
    REMOVER = 'rmv',
}

type ComodoResponse = IUnidadeComodo[];

export const unidadeComodoApi = createApi({
    reducerPath: 'unidadeComodoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['comodo'],
    endpoints: (build) => ({
        getUnidadesComodo: build.query<ComodoResponse, void>({
            query: () => 'comodo',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'comodo' as const, id })),
                          { type: 'comodo', id: 'LIST' },
                      ]
                    : [{ type: 'comodo', id: 'LIST' }],
        }),
        addUnidadeComodo: build.mutation<
            IUnidadeComodo,
            { descricao: string; tipoComodoId: number }
        >({
            query: (body) => ({
                url: `comodo`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'comodo', id: 'LIST' }],
        }),
        getUnidadeComodo: build.query<IUnidadeComodo, string>({
            query: (id) => `comodo/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'comodo', id }],
        }),
        updateUnidadeComodo: build.mutation<
            void,
            Pick<IUnidadeComodo, 'id'> & { body: { descricao: string; tipoComodoId: number } }
        >({
            query: ({ id, body }) => ({
                url: `comodo/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'comodo', id }],
        }),
        updateDispositivosComodo: build.mutation<
            void,
            Pick<IUnidadeComodo, 'id'> & {
                body: { acao: acoes.ADICIONAR | acoes.REMOVER; dispId: string };
            }
        >({
            query: ({ id, body }) => ({
                url: `/comodo/add-rmv-unidade-dispositivo/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'comodo', id }],
        }),
        deleteUnidadeComodo: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `comodo/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (_result, _error, id) => [{ type: 'comodo', id }],
        }),
    }),
});

export const {
    useGetUnidadesComodoQuery,
    useGetUnidadeComodoQuery,
    useAddUnidadeComodoMutation,
    useUpdateUnidadeComodoMutation,
    useUpdateDispositivosComodoMutation,
    useDeleteUnidadeComodoMutation,
} = unidadeComodoApi;
