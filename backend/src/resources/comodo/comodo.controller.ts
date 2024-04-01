import { Request, Response } from 'express';
import {
    getComodosDev,
    getComodos,
    getComodoByIds,
    createComodo,
    updateComodo,
    deleteComodo,
    addUnidadeDispositivoComodo,
    rmvUnidadeDispositivoComodo,
} from './comodo.service';
import {
    AddRmvUnDispComodoDto,
    CadastroComodoDto,
    EditarComodoDto,
    acoesDto,
} from './comodo.types';

const listarTodosComodosDev = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de comodos de todos os usuários (Listagem para os Devs).'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodosComodosDevDto' }
    }    
    */

    try {
        const comodos = await getComodosDev();
        res.status(200).json(comodos);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarTodosComodos = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de comodos do usuários'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodosComodosDto' }
    }    
    */

    try {
        const comodos = await getComodos(req.session.uid!);
        res.status(200).json(comodos);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarComodoEspecifico = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um cômodo específico.'
    #swagger.parameters['id'] = { description: 'ID do cômodo desejado' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ComodoDto' }
    }   
    */

    //Id do comodo
    const { id } = req.params;

    try {
        const comodo = await getComodoByIds(req.session.uid!, id);
        res.status(200).json(comodo);
    } catch (error) {
        res.status(500).json(error);
    }
};

const cadastroComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Cadastra os cômodos dos usuários no banco de dados.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CadastroComodoDto' }
    }   
    */

    const comodo = req.body as CadastroComodoDto;

    try {
        const createdComodo = await createComodo(comodo, req.session.uid!);
        res.status(201).json({ msg: 'Cômodo cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera os dados de um cômodo específico.'
    #swagger.parameters['id'] = { description: 'ID do cômodo' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarComodoDto' }
    }  
    */

    //Id do comodo
    const { id } = req.params;
    const comodo = req.body as EditarComodoDto;

    try {
        const updatedComodo = await updateComodo(comodo, req.session.uid!, id);
        res.status(200).json({ msg: 'Cômodo atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Apaga um cômodo do banco de dados.'
    #swagger.parameters['id'] = { description: 'ID do cômodo' }  
    */

    //Id do cômodo
    const { id } = req.params;

    try {
        const deletedComodo = await deleteComodo(req.session.uid!, id);
        res.status(200).json({ msg: 'Cômodo excluído com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const adicionarOuRemoverUnidadeDispositivoAoComodo = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona ou remove uma unidade de dispositivo em um cômodo específicco.'
    #swagger.parameters['comodoId'] = { description: 'ID do cômodo' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/AddRmvUnidadeDispositivoComodoDto' }
    }  
    */

    //Id da unidade de dispositivo
    const { comodoId } = req.params;
    const unidadeDispositivo = req.body as AddRmvUnDispComodoDto;

    try {
        const action: boolean = unidadeDispositivo.acao === acoesDto.ADICIONAR;

        action
            ? await addUnidadeDispositivoComodo(
                  req.session.uid!,
                  comodoId,
                  unidadeDispositivo.dispId,
              )
            : await rmvUnidadeDispositivoComodo(req.session.uid!, null, unidadeDispositivo.dispId);
        res.status(200).json({
            msg: `Dispositivo ${action ? 'adicionado ao' : 'removido do'} cômodo com sucesso.`,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    listarTodosComodosDev,
    listarTodosComodos,
    listarComodoEspecifico,
    cadastroComodo,
    atualizarComodo,
    removeComodo,
    adicionarOuRemoverUnidadeDispositivoAoComodo,
};
