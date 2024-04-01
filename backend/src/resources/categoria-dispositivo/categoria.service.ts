import { PrismaClient, CategoriaDispositivo } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategorias = async (): Promise<CategoriaDispositivo[]> => {
    return await prisma.categoriaDispositivo.findMany();
};

export const getCategoriaById = async (id: number): Promise<CategoriaDispositivo | null> => {
    return await prisma.categoriaDispositivo.findUnique({ where: { id } });
};
