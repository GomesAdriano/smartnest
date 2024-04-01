import { Rotina } from '@prisma/client';
import { ComodoDevDto } from '../comodo/comodo.types';
import { AutomatizacaoDto } from '../automatizacao/automatizacao.types';
import { JsonArray, JsonObject } from '@prisma/client/runtime/library';

//Cadastro
export type CadastroRotinaDto = Pick<Rotina, 'descricao' | 'comodoId'>;
export type EditarDescricaoRotinaDto = Omit<CadastroRotinaDto, 'comodoId'>;
export type EditarHorarioRotinaDto = Pick<Rotina, 'horario'>;
export type HabilitarRotinaDto = Pick<Rotina, 'habilitado'>;

export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

//Listagem
type ComodoDto = Omit<ComodoDevDto, 'unidadeDispositivo' | 'rotina'>;
export type RotinaDevDto = {
    id: string;
    descricao: string;
    habilitado: boolean;
    diasDaSemana: JsonValue;
    horario: string | null;
    comodo: ComodoDto;
    automatizacao: AutomatizacaoDto[];
};

export type RotinaDto = {
    id: string;
    descricao: string;
    habilitado: boolean;
    diasDaSemana: JsonValue;
    horario: string | null;
    automatizacao: AutomatizacaoDto[];
};

export type EditarDiaSemanaRotinaDto = {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    domingo: boolean;
};

export const baseSelectDev = {
    id: true,
    descricao: true,
    habilitado: true,
    diasDaSemana: true,
    horario: true,
    comodo: {
        select: {
            id: true,
            descricao: true,
            tipoComodo: true,
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    },
    automatizacao: {
        select: {
            id: true,
            status: true,
            unidadeDispositivo: {
                select: {
                    id: true,
                    descricao: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    dispositivo: {
                        select: {
                            id: true,
                            dispositivo: true,
                            categoriaDispositivo: true,
                        },
                    },
                },
            },
        },
    },
};

export const baseSelect = {
    id: true,
    descricao: true,
    habilitado: true,
    diasDaSemana: true,
    horario: true,
    comodo: {
        select: {
            id: true,
            descricao: true,
            tipoComodo: true,
        },
    },
    automatizacao: {
        select: {
            id: true,
            status: true,
            unidadeDispositivo: {
                select: {
                    id: true,
                    descricao: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    dispositivo: {
                        select: {
                            id: true,
                            dispositivo: true,
                            categoriaDispositivo: true,
                        },
                    },
                },
            },
        },
    },
};
