import { PrismaClient, TipoComodo } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTipoComodo = async (): Promise<TipoComodo[]> => {
    return await prisma.tipoComodo.findMany();
};

export const getTipoComodoById = async (id: number): Promise<TipoComodo | null> => {
    return await prisma.tipoComodo.findUnique({ where: { id } });
};
