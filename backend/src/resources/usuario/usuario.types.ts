import { Usuario } from '@prisma/client';

export type UsuarioDto = Omit<Usuario, 'senha'>;

export const baseSelect = {
    id: true,
    nome: true,
    email: true,
    createdAt: true,
    updatedAt: true,
};
