import { Request, Response } from 'express';
import { getTipoComodoById, getAllTipoComodo } from './tipo.service';

const listarTodosTipoComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de tipo de comodo.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTipoComodoDto' }
    }    
    */

    try {
        const tiposComodo = await getAllTipoComodo();
        res.status(200).json(tiposComodo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarTipoComodoEspecifico = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um tipo de cômodo específico.'
    #swagger.parameters['id'] = { description: 'ID do tipo cômodo desejado' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TipoComodoDto' }
    }   
    */

    const { id } = req.params;

    try {
        const tipoComodo = await getTipoComodoById(parseInt(id));
        res.status(200).json(tipoComodo);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { listarTodosTipoComodo, listarTipoComodoEspecifico };
