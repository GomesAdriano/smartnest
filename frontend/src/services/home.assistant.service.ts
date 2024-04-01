import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUnidadeIntegrado {
    entity_id: string;
    state: string;
    attributes: {
        friendly_name: string;
    };
}

type IHAStateResponse = IUnidadeIntegrado[];

export const homeAssistantApi = createApi({
    reducerPath: 'homeAssistantApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api/', credentials: 'include' }),
    tagTypes: ['homeAssist'],
    endpoints: (build) => ({
        getHADispositivos: build.query<IHAStateResponse, void>({
            query: () => 'home-assistant',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ entity_id }) => ({
                              type: 'homeAssist' as const,
                              entity_id,
                          })),
                          { type: 'homeAssist', id: 'LIST' },
                      ]
                    : [{ type: 'homeAssist', id: 'LIST' }],
        }),
        updateHADStatus: build.mutation<
            void,
            Pick<IUnidadeIntegrado, 'entity_id'> & Pick<IUnidadeIntegrado, 'state'>
        >({
            query: ({ entity_id, ...patch }) => ({
                url: `home-assistant/state/${entity_id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (_result, _error, { entity_id }) => [
                { type: 'homeAssist', entity_id },
            ],
        }),
    }),
});

export const { useGetHADispositivosQuery, useUpdateHADStatusMutation } = homeAssistantApi;
