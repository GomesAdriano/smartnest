import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUnidadeDispositivo } from './unidade-dispositivo.service';

export interface IAutomatizacao {
    id: string;
    status: boolean;
    unidadeDispositivo: IUnidadeDispositivo;
}

type AutomatizacaoResponse = IAutomatizacao[];

export const automatizacaoApi = createApi({
    reducerPath: 'automatizacaoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['automatizacao'],
    endpoints: (build) => ({
        getAutomatizacoesComodo: build.query<AutomatizacaoResponse, void>({
            query: (id) => `automatizacao/rotina/${id}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'automatizacao' as const, id })),
                          { type: 'automatizacao', id: 'LIST' },
                      ]
                    : [{ type: 'automatizacao', id: 'LIST' }],
        }),
        getAutomatizacao: build.query<IAutomatizacao, string>({
            query: (id) => `automatizacao/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'automatizacao', id }],
        }),
        addAutomatizacao: build.mutation<
            IAutomatizacao,
            { rotinaId: string; unidadeDispositivoId: string; status: boolean }
        >({
            query: (body) => ({
                url: `automatizacao`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'automatizacao', id: 'LIST' }],
        }),
        updateAlteraAutomatizacao: build.mutation<
            IAutomatizacao,
            Pick<IAutomatizacao, 'id'> & { body: { status: boolean } }
        >({
            query: ({ id, body }) => ({
                url: `/automatizacao/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteAutomatizacao: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `automatizacao/${id}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});
export const {
    useGetAutomatizacoesComodoQuery,
    useGetAutomatizacaoQuery,
    useAddAutomatizacaoMutation,
    useUpdateAlteraAutomatizacaoMutation,
    useDeleteAutomatizacaoMutation,
} = automatizacaoApi;
