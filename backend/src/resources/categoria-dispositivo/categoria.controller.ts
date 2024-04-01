import { Request, Response } from 'express';
import { getCategoriaById, getCategorias } from './categoria.service';

const listarTodasCategorias = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de categorias de dispositivos.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemCategoriaDto' }
    }    
    */

    try {
        const categorias = await getCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarCategoriaEspecifica = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um categoria de dispositivos específica.'
    #swagger.parameters['id'] = { description: 'ID da categoria desejada' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/CategoriaDto' }
    }   
    */

    const { id } = req.params;

    try {
        const categoria = await getCategoriaById(parseInt(id));
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { listarTodasCategorias, listarCategoriaEspecifica };
