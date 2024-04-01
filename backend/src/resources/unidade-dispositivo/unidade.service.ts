import { PrismaClient, UnidadeDispositivo } from '@prisma/client';
import {
    CadastroUnidadeDispositivoDto,
    EditarStatusUnidadeDispositivoDto,
    EditarUnidadeDispositivoDto,
    UnidadeDispositivoDevDto,
    UnidadeDispositivoDto,
    baseSelect,
    baseSelectDev,
} from './unidade.types';

const prisma = new PrismaClient();

const customPrisma = new PrismaClient().$extends({
    query: {
        unidadeDispositivo: {
            async findMany({ model, operation, args, query }) {
                args.where = { ...args.where, comodoId: null };
                return query(args);
            },
        },
    },
});

export const getUnidadesDispositivoDev = async (): Promise<UnidadeDispositivoDevDto[]> => {
    return await prisma.unidadeDispositivo.findMany({
        select: baseSelectDev,
    });
};

export const getUnidadesDispositivo = async (
    usuarioId: string,
): Promise<UnidadeDispositivoDto[]> => {
    return await prisma.unidadeDispositivo.findMany({
        select: baseSelect,
        where: { usuarioId },
    });
};

export const getUnidadesDispositivoSemComodo = async (
    usuarioId: string,
): Promise<UnidadeDispositivoDto[]> => {
    return await customPrisma.unidadeDispositivo.findMany({
        select: baseSelect,
        where: { usuarioId },
    });
};

export const getUnidadeDispositivoByIds = async (
    usuarioId: string,
    id: string,
): Promise<UnidadeDispositivoDto | null> => {
    return await prisma.unidadeDispositivo.findUnique({
        select: baseSelect,
        where: { usuarioId, id },
    });
};

export const createUnidadeDispositivo = async (
    unidade: CadastroUnidadeDispositivoDto,
    usuarioId: string,
): Promise<UnidadeDispositivo> => {
    return await prisma.unidadeDispositivo.create({
        data: {
            ...unidade,
            usuarioId,
        },
    });
};

export const updateUnidadeDispositivo = async (
    unidade: EditarUnidadeDispositivoDto,
    usuarioId: string,
    id: string,
): Promise<UnidadeDispositivo> => {
    return await prisma.unidadeDispositivo.update({
        data: {
            ...unidade,
            status: false,
        },
        where: { usuarioId, id },
    });
};

export const updateStatusUnidadadeDispositivo = async (
    unidade: EditarStatusUnidadeDispositivoDto,
    usuarioId: string,
    id: string,
): Promise<EditarStatusUnidadeDispositivoDto> => {
    return await prisma.unidadeDispositivo.update({
        data: { ...unidade },
        where: { usuarioId, id },
    });
};

export const deleteUnidadeDispositivo = async (
    usuarioId: string,
    id: string,
): Promise<UnidadeDispositivo> => {
    return await prisma.unidadeDispositivo.delete({ where: { usuarioId, id } });
};
