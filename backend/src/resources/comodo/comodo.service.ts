import { PrismaClient, Comodo, UnidadeDispositivo } from '@prisma/client';
import {
    CadastroComodoDto,
    EditarComodoDto,
    ComodoDevDto,
    ComodoDto,
    baseSelectDev,
    baseSelect,
} from './comodo.types';

const prisma = new PrismaClient();

export const getComodosDev = async (): Promise<ComodoDevDto[]> => {
    return await prisma.comodo.findMany({
        select: baseSelectDev,
    });
};

export const getComodos = async (usuarioId: string): Promise<ComodoDto[]> => {
    return await prisma.comodo.findMany({
        select: baseSelect,
        where: { usuarioId },
    });
};

export const getComodoByIds = async (usuarioId: string, id: string): Promise<ComodoDto | null> => {
    return await prisma.comodo.findUnique({
        select: baseSelect,
        where: { usuarioId, id },
    });
};

export const createComodo = async (
    comodo: CadastroComodoDto,
    usuarioId: string,
): Promise<Comodo> => {
    return await prisma.comodo.create({
        data: {
            ...comodo,
            usuarioId,
        },
    });
};

export const updateComodo = async (
    comodo: EditarComodoDto,
    usuarioId: string,
    id: string,
): Promise<Comodo> => {
    return await prisma.comodo.update({
        data: {
            ...comodo,
        },
        where: { usuarioId, id },
    });
};

export const deleteComodo = async (usuarioId: string, id: string): Promise<Comodo> => {
    return await prisma.comodo.delete({ where: { usuarioId, id } });
};

//Adiciona Unidade de Dispositivo ao Comodo Especifico
export const addUnidadeDispositivoComodo = async (
    usuarioId: string,
    comodoId: string,
    id: string,
): Promise<UnidadeDispositivo> => {
    return await prisma.unidadeDispositivo.update({
        data: {
            comodoId,
        },
        where: { usuarioId, id },
    });
};

//Remove Unidade de Dispositivo do Comodo Especifico
export const rmvUnidadeDispositivoComodo = async (
    usuarioId: string,
    comodoId: null,
    id: string,
) => {
    const rmvAutomatizacao = prisma.automatizacao.deleteMany({
        where: { unidadeDispositivoId: id },
    });

    const rmvUnidade = prisma.unidadeDispositivo.update({
        data: { comodoId },
        where: { usuarioId, id },
    });

    return await prisma.$transaction([rmvAutomatizacao, rmvUnidade]);
};
