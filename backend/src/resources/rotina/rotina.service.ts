import { Prisma, PrismaClient, Rotina } from '@prisma/client';
import {
    CadastroRotinaDto,
    EditarDescricaoRotinaDto,
    RotinaDevDto,
    RotinaDto,
    baseSelectDev,
    baseSelect,
    HabilitarRotinaDto,
    EditarDiaSemanaRotinaDto,
    EditarHorarioRotinaDto,
} from './rotina.types';
import { ExecutarAutomatizacaoDto } from '../automatizacao/automatizacao.types';

const prisma = new PrismaClient();

//Listagem
export const getRotinasDev = async (): Promise<RotinaDevDto[]> => {
    return await prisma.rotina.findMany({
        select: baseSelectDev,
    });
};

//Esta vendo varias rotinas de um comodo
export const getRotinas = async (comodoId: string): Promise<RotinaDto[]> => {
    return await prisma.rotina.findMany({
        select: baseSelect,
        where: { comodoId },
    });
};

//Esta vendo uma rotina especifica
export const getRotinaById = async (id: string): Promise<RotinaDto | null> => {
    return await prisma.rotina.findUnique({
        select: baseSelect,
        where: { id },
    });
};

//Cadastro
export const createRotina = async (rotina: CadastroRotinaDto): Promise<Rotina> => {
    const padrao = {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
    } as Prisma.JsonObject;

    return await prisma.rotina.create({
        data: {
            ...rotina,
            habilitado: false,
            diasDaSemana: padrao,
            horario: null,
        },
    });
};

export const enableRotina = async (rotina: HabilitarRotinaDto, id: string): Promise<Rotina> => {
    return await prisma.rotina.update({
        data: { ...rotina },
        where: { id },
    });
};

//Editar
export const updateDescricaoRotina = async (
    rotina: EditarDescricaoRotinaDto,
    id: string,
): Promise<Rotina> => {
    return await prisma.rotina.update({
        data: { ...rotina },
        where: { id },
    });
};

export const updateDiaSemanaRotina = async (
    diasDaSemana: EditarDiaSemanaRotinaDto,
    id: string,
): Promise<Rotina> => {
    return await prisma.rotina.update({
        data: { diasDaSemana },
        where: { id },
    });
};

export const updateHorarioRotina = async (
    rotina: EditarHorarioRotinaDto,
    id: string,
): Promise<Rotina> => {
    return await prisma.rotina.update({
        data: { ...rotina },
        where: { id },
    });
};

export const deleteRotina = async (id: string): Promise<Rotina> => {
    return await prisma.rotina.delete({ where: { id } });
};

export const playRotina = async (automatizacoes: ExecutarAutomatizacaoDto[]) => {
    for (const automatizacao of automatizacoes) {
        await prisma.unidadeDispositivo.update({
            data: { status: automatizacao.status },
            where: { id: automatizacao.unidadeDispositivoId },
        });
    }
};
