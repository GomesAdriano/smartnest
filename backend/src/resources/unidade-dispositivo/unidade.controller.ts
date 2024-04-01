import { Request, Response } from 'express';
import {
    getUnidadesDispositivoDev,
    getUnidadesDispositivo,
    getUnidadeDispositivoByIds,
    createUnidadeDispositivo,
    updateUnidadeDispositivo,
    updateStatusUnidadadeDispositivo,
    deleteUnidadeDispositivo,
    getUnidadesDispositivoSemComodo,
} from './unidade.service';
import {
    CadastroUnidadeDispositivoDto,
    EditarUnidadeDispositivoDto,
    EditarStatusUnidadeDispositivoDto,
} from './unidade.types';

const listarTodasUnidadesDispositivoDev = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem das unidades de dispositivos dos usuários (Listagem para os Devs).'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasUnidadeDispositivoDevDto' }
    }    
    */

    try {
        const unidadesDispositivo = await getUnidadesDispositivoDev();
        res.status(200).json(unidadesDispositivo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarTodasUnidadesDispositivo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem das unidades de dispositivos dos usuários.'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasUnidadeDispositivoDto' }
    }    
    */

    try {
        const unidadesDispositivo = await getUnidadesDispositivo(req.session.uid!);
        res.status(200).json(unidadesDispositivo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarTodasUnidadesDispositivoSemComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem das unidades de dispositivos que não estão associadas há um cômodo.'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasUnidadeDispositivoSemComodoDto' }
    }    
    */

    try {
        const unidadesDispositivo = await getUnidadesDispositivoSemComodo(req.session.uid!);
        res.status(200).json(unidadesDispositivo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarUnidadeDispositivoEspecifico = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de uma unidade de dispositivo específica.'
    #swagger.parameters['id'] = { description: 'ID da unidade desejada' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/UnidadeDispositivoDto' }
    }   
    */

    //Id da unidade de dispositivo
    const { id } = req.params;

    try {
        const unidadeDispositivo = await getUnidadeDispositivoByIds(req.session.uid!, id);
        res.status(200).json(unidadeDispositivo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const cadastroUnidadeDispositivo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Cadastra as unidades de dispositivos dos usuários no banco de dados.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CadastroUnidadeDispositivoDto' }
    }   
    */

    const unidadeDispositivo = req.body as CadastroUnidadeDispositivoDto;

    try {
        const createdUnidadeDispositivo = await createUnidadeDispositivo(
            unidadeDispositivo,
            req.session.uid!,
        );
        res.status(201).json({ msg: 'Dispositivo cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarUnidadeDispositivo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera os dados de uma unidade de dispositivo específica.'
    #swagger.parameters['id'] = { description: 'ID da unidade de dispositivo' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarUnidadeDispositivoDto' }
    }  
    */

    //Id da unidade de dispositivo
    const { id } = req.params;
    const unidadeDispositivo = req.body as EditarUnidadeDispositivoDto;

    try {
        const updatedUnidadeDispositivo = await updateUnidadeDispositivo(
            unidadeDispositivo,
            req.session.uid!,
            id,
        );
        res.status(200).json({ msg: 'Dispositivo atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarStatusUnidadeDispositivo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera o dado de status de uma unidade de dispositivo específica.'
    #swagger.parameters['id'] = { description: 'ID da unidade de dispositivo' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarStatusUnidadeDispositivoDto' }
    }  
    */

    //Id da unidade de dispositivo
    const { id } = req.params;
    const unidadeDispositivo = req.body as EditarStatusUnidadeDispositivoDto;

    try {
        const updatedStatusUnidadeDispositivo = await updateStatusUnidadadeDispositivo(
            unidadeDispositivo,
            req.session.uid!,
            id,
        );
        //Personalizar msg para ligado / desligado
        res.status(200).json({
            msg: 'Status do dispositivo atualizado com sucesso.',
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeUnidadeDispositivo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Apaga uma unidade de dispositivo do banco de dados.'
    #swagger.parameters['id'] = { description: 'ID da unidade de dispositivo' }  
    */

    //Id da unidade de dispositivo
    const { id } = req.params;

    try {
        const deletedUnidadeDispositivo = await deleteUnidadeDispositivo(req.session.uid!, id);
        res.status(200).json({ msg: 'Dispositivo excluído com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    listarTodasUnidadesDispositivoDev,
    listarTodasUnidadesDispositivo,
    listarTodasUnidadesDispositivoSemComodo,
    listarUnidadeDispositivoEspecifico,
    cadastroUnidadeDispositivo,
    atualizarUnidadeDispositivo,
    atualizarStatusUnidadeDispositivo,
    removeUnidadeDispositivo,
};
