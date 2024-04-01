import { Comodo } from '@prisma/client';
import { TipoComodoDto } from '../tipo-comodo/tipo.types';
import { UsuarioDto } from '../usuario/usuario.types';
import { UnidadeDispositivoDevDto } from '../unidade-dispositivo/unidade.types';
import { RotinaDto } from '../rotina/rotina.types';

export type CadastroComodoDto = Pick<Comodo, 'descricao' | 'tipoComodoId'>;
export type EditarComodoDto = CadastroComodoDto;

type UnidadeDispositivoDto = Omit<UnidadeDispositivoDevDto, 'usuario' | 'comodo' | 'automatizacao'>;
export type ComodoDevDto = {
    id: string;
    descricao: string;
    tipoComodo: TipoComodoDto;
    usuario: UsuarioDto;
    unidadeDispositivo: UnidadeDispositivoDto[];
    rotina: RotinaDto[];
};

export type ComodoDto = Omit<ComodoDevDto, 'usuario'>;

export type AddRmvUnDispComodoDto = {
    acao: string;
    dispId: string;
};

export enum acoesDto {
    ADICIONAR = 'add',
    REMOVER = 'rmv',
}

export const baseSelectDev = {
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
    rotina: {
        select: {
            id: true,
            descricao: true,
            habilitado: true,
            diasDaSemana: true,
            horario: true,
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
        },
    },
};

export const baseSelect = {
    id: true,
    descricao: true,
    tipoComodo: true,
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
    rotina: {
        select: {
            id: true,
            descricao: true,
            habilitado: true,
            diasDaSemana: true,
            horario: true,
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
        },
    },
};
