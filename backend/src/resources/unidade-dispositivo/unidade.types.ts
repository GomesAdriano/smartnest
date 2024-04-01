import { UnidadeDispositivo } from '@prisma/client';
import { DispositivoDto } from '../dispositivo/dispositivo.types';
import { UsuarioDto } from '../usuario/usuario.types';
import { ComodoDevDto } from '../comodo/comodo.types';
import { AutomatizacaoDevDto } from '../automatizacao/automatizacao.types';

export type CadastroUnidadeDispositivoDto = Pick<UnidadeDispositivo, 'descricao' | 'dispositivoId'>;
export type EditarUnidadeDispositivoDto = CadastroUnidadeDispositivoDto;
export type EditarStatusUnidadeDispositivoDto = Pick<UnidadeDispositivo, 'status'>;

type ComodoDto = Omit<ComodoDevDto, 'usuario' | 'unidadeDispositivo' | 'rotina'>;

export type UnidadeDispositivoDevDto = {
    id: string;
    descricao: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    usuario: UsuarioDto;
    dispositivo: DispositivoDto;
    comodo: ComodoDto | null;
    automatizacao: AutomatizacaoDevDto[];
};

export type UnidadeDispositivoDto = Omit<
    UnidadeDispositivoDevDto,
    'createdAt' | 'updatedAt' | 'usuario'
>;

export const baseSelectDev = {
    id: true,
    descricao: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    usuario: {
        select: {
            id: true,
            nome: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    },
    dispositivo: {
        select: {
            id: true,
            dispositivo: true,
            categoriaDispositivo: true,
        },
    },
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
            rotina: {
                select: {
                    id: true,
                    descricao: true,
                    habilitado: true,
                    diasDaSemana: true,
                    horario: true,
                },
            },
        },
    },
};

export const baseSelect = {
    id: true,
    descricao: true,
    status: true,
    dispositivo: {
        select: {
            id: true,
            dispositivo: true,
            categoriaDispositivo: true,
        },
    },
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
            rotina: {
                select: {
                    id: true,
                    descricao: true,
                    habilitado: true,
                    diasDaSemana: true,
                    horario: true,
                },
            },
        },
    },
};
