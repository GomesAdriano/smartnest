import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUnidadeComodo } from './comodo.service';
import { IAutomatizacao } from './automatizacao.service';

export interface IRotina {
    id: string;
    descricao: string;
    habilitado: boolean;
    diasDaSemana: DiasDaSemana;
    comodo: IUnidadeComodo;
    automatizacao: IAutomatizacao[];
    horario: string | null;
}

export type DiasDaSemana = {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    domingo: boolean;
};

type RotinaResponse = IRotina[];

export const rotinaApi = createApi({
    reducerPath: 'rotinaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['rotina'],
    endpoints: (build) => ({
        getRotinasComodo: build.query<RotinaResponse, string>({
            query: (id) => `rotina/comodo/${id}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'rotina' as const, id })),
                          { type: 'rotina', id: 'LIST' },
                      ]
                    : [{ type: 'rotina', id: 'LIST' }],
        }),
        addRotina: build.mutation<IRotina, { descricao: string; comodoId: string }>({
            query: (body) => ({
                url: `rotina`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'rotina', id: 'LIST' }],
        }),
        getRotina: build.query<IRotina, string>({
            query: (id) => `rotina/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'rotina', id }],
        }),
        updateNomeRotina: build.mutation<
            void,
            Pick<IRotina, 'id'> & { body: { descricao: string } }
        >({
            query: ({ id, body }) => ({
                url: `rotina/descricao/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'rotina', id }],
        }),
        updateDiasRotina: build.mutation<void, Pick<IRotina, 'id'> & { body: DiasDaSemana }>({
            query: ({ id, body }) => ({
                url: `rotina/dia-semana/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'rotina', id }],
        }),
        updateHorarioRotina: build.mutation<
            void,
            Pick<IRotina, 'id'> & { body: { horario: string } }
        >({
            query: ({ id, body }) => ({
                url: `rotina/horario/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'rotina', id }],
        }),
        updateExecutarRotina: build.mutation<
            void,
            {
                body: { unidadeDispositivoId: string; status: boolean }[];
            }
        >({
            query: ({ body }) => ({
                url: `/rotina/executar`,
                method: 'POST',
                body,
            }),
        }),
        deleteRotina: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `rotina/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (_result, _error, id) => [{ type: 'rotina', id }],
        }),
        updateHabilitaRotina: build.mutation<
            void,
            Pick<IRotina, 'id'> & {
                body: { habilitado: boolean };
            }
        >({
            query: ({ id, body }) => ({
                url: `/rotina/habilitar/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useGetRotinasComodoQuery,
    useGetRotinaQuery,
    useAddRotinaMutation,
    useUpdateNomeRotinaMutation,
    useUpdateDiasRotinaMutation,
    useUpdateHorarioRotinaMutation,
    useUpdateExecutarRotinaMutation,
    useDeleteRotinaMutation,
    useUpdateHabilitaRotinaMutation,
} = rotinaApi;
