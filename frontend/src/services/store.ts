import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categoriaApi } from './categoria-dispositivo.service';
import { dispositivoApi } from './dispositivo.service';
import { unidadeDispositivoApi } from './unidade-dispositivo.service';
import { unidadeComodoApi } from './comodo.service';
import { tipoComodoApi } from './tipo-comodo.service';
import { rotinaApi } from './rotina.service';
import { automatizacaoApi } from './automatizacao.service';
import { homeAssistantApi } from './home.assistant.service';

const rootReducer = combineReducers({
    [categoriaApi.reducerPath]: categoriaApi.reducer,
    [dispositivoApi.reducerPath]: dispositivoApi.reducer,
    [unidadeDispositivoApi.reducerPath]: unidadeDispositivoApi.reducer,
    [unidadeComodoApi.reducerPath]: unidadeComodoApi.reducer,
    [tipoComodoApi.reducerPath]: tipoComodoApi.reducer,
    [rotinaApi.reducerPath]: rotinaApi.reducer,
    [automatizacaoApi.reducerPath]: automatizacaoApi.reducer,
    [homeAssistantApi.reducerPath]: homeAssistantApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriaApi.middleware,
            dispositivoApi.middleware,
            unidadeDispositivoApi.middleware,
            unidadeComodoApi.middleware,
            tipoComodoApi.middleware,
            rotinaApi.middleware,
            automatizacaoApi.middleware,
            homeAssistantApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
