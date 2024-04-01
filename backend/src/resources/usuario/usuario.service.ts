import { PrismaClient } from '@prisma/client';
import { CadastroUsuarioDto } from '../auth/auth.types';
import { UsuarioDto, baseSelect } from './usuario.types';
import generateHashPassword from '../../utils/generateHashPassword';

const prisma = new PrismaClient();

export const getUsuarios = async (): Promise<UsuarioDto[]> => {
    return await prisma.usuario.findMany({
        select: baseSelect,
    });
};

export const createUsuario = async (usuario: CadastroUsuarioDto): Promise<UsuarioDto> => {
    const hash = await generateHashPassword(usuario.senha);

    return await prisma.usuario.create({
        data: {
            ...usuario,
            senha: hash,
        },
    });
};

export const getUsuarioByEmail = async (email: string): Promise<UsuarioDto | null> => {
    return await prisma.usuario.findUnique({
        select: baseSelect,
        where: { email },
    });
};

export const getUsuarioById = async (id: string): Promise<UsuarioDto | null> => {
    return await prisma.usuario.findUnique({
        select: baseSelect,
        where: { id },
    });
};
