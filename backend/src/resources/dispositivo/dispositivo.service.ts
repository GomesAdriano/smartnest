import { PrismaClient } from '@prisma/client';
import { DispositivoDto, baseSelect } from './dispositivo.types';

const prisma = new PrismaClient();

//Lista todos os dispositivos
export const getDispositivos = async (): Promise<DispositivoDto[]> => {
    return await prisma.dispositivo.findMany({
        select: baseSelect,
    });
};

//Lista o dispositivo especifico
export const getDispositivoById = async (id: number): Promise<DispositivoDto | null> => {
    return await prisma.dispositivo.findUnique({
        select: baseSelect,
        where: { id },
    });
};

//Lista todos os dispositivos de uma certa categoria
export const getDispositivosByCategoria = async (
    categoriaDispositivoId: number,
): Promise<DispositivoDto[]> => {
    return await prisma.dispositivo.findMany({
        select: baseSelect,
        where: { categoriaDispositivoId },
    });
};
