import { Prisma, PrismaClient } from '@prisma/client';
import { RotinaDto, baseSelect } from './agendamento.types';

const prisma = new PrismaClient();

export const getRotinas = async (diaDaSemana: string, horario: string): Promise<RotinaDto[]> => {
    return await prisma.rotina.findMany({
        select: baseSelect,
        where: {
            AND: [
                {
                    habilitado: {
                        equals: true,
                    },
                },
                {
                    diasDaSemana: {
                        path: `$.${diaDaSemana}`,
                        equals: true,
                    },
                },
                {
                    horario: {
                        equals: horario,
                    },
                },
            ],
        },
    });
};
