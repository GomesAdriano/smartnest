import { PrismaClient, Automatizacao } from '@prisma/client';
import {
    AutomatizacaoDto,
    CadastroAutomatizacaoDto,
    EditarAutomatizacaoDto,
    baseSelect,
} from './automatizacao.types';

const prisma = new PrismaClient();

export const getAutomatizacoes = async (rotinaId: string): Promise<AutomatizacaoDto[]> => {
    return await prisma.automatizacao.findMany({
        select: baseSelect,
        where: { rotinaId },
    });
};

export const getAutomatizacaoById = async (id: string): Promise<AutomatizacaoDto | null> => {
    return await prisma.automatizacao.findUnique({
        select: baseSelect,
        where: { id },
    });
};

export const createAutomatizacao = async (
    automatizacao: CadastroAutomatizacaoDto,
): Promise<Automatizacao> => {
    return await prisma.automatizacao.create({
        data: { ...automatizacao },
    });
};

export const updateStatusAutomatizacao = async (
    automatizacao: EditarAutomatizacaoDto,
    id: string,
): Promise<Automatizacao> => {
    return await prisma.automatizacao.update({
        data: { ...automatizacao },
        where: { id },
    });
};

export const deleteAutomatizacao = async (id: string): Promise<Automatizacao> => {
    return await prisma.automatizacao.delete({
        where: { id },
    });
};
