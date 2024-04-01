import { Request, Response } from 'express';
import { CadastroUsuarioDto, LoginDto } from './auth.types';
import { createUsuario, getUsuarioByEmail } from '../usuario/usuario.service';
import { checkAuth } from './auth.service';

const cadastroUsuario = async (req: Request, res: Response) => {
    /*
    #swagger.summary = "Cadastra os usuários no banco de dados."
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CadastroUsuarioDto' }
    }
    */

    const usuario = req.body as CadastroUsuarioDto;

    try {
        if (await getUsuarioByEmail(usuario.email))
            return res.status(400).json({ msg: 'E-mail atualmente em uso' });

        const createdUsuario = await createUsuario(usuario);
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
    } catch (e) {
        res.status(500).json(e);
    }
};

const login = async (req: Request, res: Response) => {
    /*
    #swagger.summary = "Autenticação de usuários."
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/LoginDto' }
    }
    */

    const { email, senha } = req.body as LoginDto;

    try {
        const usuario = await checkAuth({ email, senha });

        if (!usuario) return res.status(401).json({ msg: 'Email e/ou Senha incorretos' });

        req.session.uid = usuario.id;
        res.status(201).json({ msg: 'Usuário autenticado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const logout = async (req: Request, res: Response) => {
    /*
    #swagger.summary = "Logout de usuários."
    */

    req.session.destroy((err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ msg: 'Usuário deslogado com sucesso' });
    });
};

export default { cadastroUsuario, login, logout };
