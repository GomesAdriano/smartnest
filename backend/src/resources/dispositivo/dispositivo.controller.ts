import { Request, Response } from 'express';
import {
    getDispositivos,
    getDispositivoById,
    getDispositivosByCategoria,
} from './dispositivo.service';

const listarTodosDispositivos = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de dispositivos predefinidos.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemDispositivoDto' }
    }    
    */
    try {
        const dispositivos = await getDispositivos();
        res.status(200).json(dispositivos);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarDispositivoEspecifico = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um dispositivo específica.'
    #swagger.parameters['id'] = { description: 'ID do dispositivo desejado' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/DispositivoDto' }
    }   
    */

    const { id } = req.params;

    try {
        const dispositivo = await getDispositivoById(parseInt(id));
        res.status(200).json(dispositivo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarDispositivosDeCategoriaEspecifica = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de dispositivos predefinidos de uma categoria especifica.'
    #swagger.parameters['id'] = { description: 'ID da categoria desejada' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemDispositivoCategoriaDto' }
    }    
    */

    const { id } = req.params;

    try {
        const dispositivos = await getDispositivosByCategoria(parseInt(id));
        res.status(200).json(dispositivos);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    listarTodosDispositivos,
    listarDispositivoEspecifico,
    listarDispositivosDeCategoriaEspecifica,
};
