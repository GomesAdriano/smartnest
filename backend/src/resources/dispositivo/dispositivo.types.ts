import { CategoriaDispositivoDto } from '../categoria-dispositivo/categoria.types';

export type DispositivoDto = {
    id: number;
    dispositivo: string;
    categoriaDispositivo: CategoriaDispositivoDto;
};

export const baseSelect = {
    id: true,
    dispositivo: true,
    categoriaDispositivo: true,
};
