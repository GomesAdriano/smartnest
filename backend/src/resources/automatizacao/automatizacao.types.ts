import { UnidadeDispositivoDevDto } from '../unidade-dispositivo/unidade.types';
import { RotinaDevDto } from '../rotina/rotina.types';
import { Automatizacao } from '@prisma/client';

export type CadastroAutomatizacaoDto = Omit<Automatizacao, 'id'>;
export type EditarAutomatizacaoDto = Pick<Automatizacao, 'status'>;

type UnidadeDispositivoDto = Omit<UnidadeDispositivoDevDto, 'usuario' | 'comodo' | 'automatizacao'>;
type RotinaDto = Omit<RotinaDevDto, 'comodo' | 'automatizacao'>;

export type AutomatizacaoDevDto = {
    id: string;
    status: boolean;
    rotina: RotinaDto;
};

export type AutomatizacaoDto = {
    id: string;
    status: boolean;
    unidadeDispositivo: UnidadeDispositivoDto;
};

export type ExecutarAutomatizacaoDto = {
    unidadeDispositivoId: string;
    status: boolean;
};

export const baseSelect = {
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
};
