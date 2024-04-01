import { Request, Response } from 'express';
import { getUsuarios, getUsuarioById } from './usuario.service';

const listarTodosUsuarios = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de Usuários.' 
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemUsuarioDto' }
    }    
    */

    try {
        const usuarios = await getUsuarios();
        res.status(200).json(usuarios);
    } catch (e) {
        res.status(500).json(e);
    }
};

const listarUsuarioEspecifico = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um usuário específico.'
    #swagger.parameters['id'] = { description: 'ID do usuário desejado' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/UsuarioDto' }
    }   
    */

    const { id } = req.params;

    try {
        const usuario = await getUsuarioById(id);

        if (!usuario) return res.status(400).json({ msg: 'Usuário não existe' });

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Usuário não existe' });
    }
};

export default { listarTodosUsuarios, listarUsuarioEspecifico };
