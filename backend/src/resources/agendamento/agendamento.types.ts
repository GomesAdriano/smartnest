import { Automatizacao } from '@prisma/client';
import { JsonValue } from '../rotina/rotina.types';

type AutomatizacaoDto = Omit<Automatizacao, 'id' | 'rotinaId'>;

export type RotinaDto = {
    automatizacao: AutomatizacaoDto[];
};

export const baseSelect = {
    automatizacao: {
        select: {
            status: true,
            unidadeDispositivoId: true,
        },
    },
};
