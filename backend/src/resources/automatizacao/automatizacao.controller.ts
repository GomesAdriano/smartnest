import { Request, Response } from 'express';
import {
    CadastroAutomatizacaoDto,
    EditarAutomatizacaoDto,
} from '../automatizacao/automatizacao.types';
import {
    createAutomatizacao,
    deleteAutomatizacao,
    getAutomatizacaoById,
    getAutomatizacoes,
    updateStatusAutomatizacao,
} from './automatizacao.service';

const listarTodasAutomatizacoes = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de automatizacoes de uma rotina do usuário'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasAutomatizacoesDto' }
    }    
    */

    //id da rotina
    const { id } = req.params;

    try {
        const automatizacoes = await getAutomatizacoes(id);
        res.status(200).json(automatizacoes);
    } catch (error) {
        res.status(500).json(error);
    }
};

const buscarAutomatizacaoEspeficica = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de uma automatizacao específica.'
    #swagger.parameters['id'] = { description: 'ID da automatizacao desejada' }
    #swagger.responses[200] = {
        in: 'body',
        schema: { $ref: '#/definitions/AutomatizacaoDto' }
    }   
    */

    //Id da rotina
    const { id } = req.params;

    try {
        const rotina = await getAutomatizacaoById(id);
        res.status(200).json(rotina);
    } catch (error) {
        res.status(500).json(error);
    }
};

const cadastroAutomatizacao = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Cadastra automatização da rotina no banco de dados.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CadastroAutomatizacaoDto' }
    }   
    */

    const automatizacao = req.body as CadastroAutomatizacaoDto;

    try {
        const createdAutomatizacao = await createAutomatizacao(automatizacao);
        res.status(201).json({ msg: 'Automatização cadastrada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarStatusAutomatizacao = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera os dados de uma automatizacao específica.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarAutomatizacaoDto' }
    }  
    */

    //Id da automatizacao
    const { id } = req.params;
    const automatizacao = req.body as EditarAutomatizacaoDto;

    try {
        const updatedAutomatizacao = await updateStatusAutomatizacao(automatizacao, id);
        res.status(200).json({ msg: 'Automatização atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeAutomatizacao = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Apaga uma automatização do banco de dados.'
    #swagger.parameters['id'] = { description: 'ID da automatização' }  
    */

    //Id da automatização
    const { id } = req.params;

    try {
        const deletedAutomatizacao = await deleteAutomatizacao(id);
        res.status(200).json({ msg: 'Automatização excluída com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    listarTodasAutomatizacoes,
    buscarAutomatizacaoEspeficica,
    cadastroAutomatizacao,
    atualizarStatusAutomatizacao,
    removeAutomatizacao,
};
