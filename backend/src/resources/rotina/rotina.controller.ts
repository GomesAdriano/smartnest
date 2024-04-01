import { Request, Response } from 'express';
import {
    CadastroRotinaDto,
    EditarDiaSemanaRotinaDto,
    EditarHorarioRotinaDto,
    EditarDescricaoRotinaDto,
    HabilitarRotinaDto,
} from './rotina.types';
import {
    createRotina,
    updateDescricaoRotina,
    deleteRotina,
    getRotinaById,
    getRotinas,
    getRotinasDev,
    playRotina,
    enableRotina,
    updateDiaSemanaRotina,
    updateHorarioRotina,
} from './rotina.service';
import { ExecutarAutomatizacaoDto } from '../automatizacao/automatizacao.types';

const listarTodasRotinasDev = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de rotinas de todos os usuários (Listagem para os Devs).'  
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasRotinasDevDto' }
    }    
    */

    try {
        const rotinas = await getRotinasDev();
        res.status(200).json(rotinas);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarTodasRotinas = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Listagem de rotinas de um cômodo do usuário'
    #swagger.parameters['id'] = { description: 'ID do comodo desejado' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListagemTodasRotinasComodoDto' }
    }    
    */

    //id do comodo
    const { id } = req.params;

    try {
        const rotinas = await getRotinas(id);
        res.status(200).json(rotinas);
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarRotinaEspecifica = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de uma rotina específica.'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.responses[200] = {
        in: 'body',
        schema: { $ref: '#/definitions/RotinaDto' }
    }   
    */

    //Id da rotina
    const { id } = req.params;

    try {
        const rotina = await getRotinaById(id);
        res.status(200).json(rotina);
    } catch (error) {
        res.status(500).json(error);
    }
};

const cadastroRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Cadastra rotina no cômodo do usuário no banco de dados.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CadastroRotinaDto' }
    }   
    */

    const rotina = req.body as CadastroRotinaDto;

    try {
        const createdRotina = await createRotina(rotina);
        res.status(201).json({ msg: 'Rotina criada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const habilitarRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Habilita ou desabilita uma rotina específica.'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/HabilitarRotinaDto' }
    }  
    */

    //Id da rotina
    const { id } = req.params;
    const rotina = req.body as HabilitarRotinaDto;

    try {
        const enabledRotina = await enableRotina(rotina, id);
        res.status(200).json({ msg: 'Rotina atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarDescricaoRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera a descrição de uma rotina específica.'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarDescricaoRotinaDto' }
    }  
    */

    //Id da rotina
    const { id } = req.params;
    const rotina = req.body as EditarDescricaoRotinaDto;

    try {
        const updatedDescricaoRotina = await updateDescricaoRotina(rotina, id);
        res.status(200).json({ msg: 'Rotina atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarDiaSemanaRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera o dia da semana de uma rotina específica.'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarDiaSemanaRotinaDto' }
    }  
    */

    //Id da rotina
    const { id } = req.params;
    const diaSemana = req.body as EditarDiaSemanaRotinaDto;

    try {
        const updatedDiaSemanaRotina = await updateDiaSemanaRotina(diaSemana, id);
        res.status(200).json({ msg: 'Rotina atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarHorarioRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera o horário de uma rotina específica.'
    #swagger.parameters['id'] = { description: 'ID da rotina desejada' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EditarHorarioRotinaDto' }
    }  
    */

    //Id da rotina
    const { id } = req.params;
    const horario = req.body as EditarHorarioRotinaDto;

    try {
        const updatedHorarioRotina = await updateHorarioRotina(horario, id);
        res.status(200).json({ msg: 'Rotina atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Apaga uma rotina e suas automatizações do banco de dados.'
    #swagger.parameters['id'] = { description: 'ID da rotina' }  
    */

    //Id da rotina
    const { id } = req.params;

    try {
        const deletedRotina = await deleteRotina(id);
        res.status(200).json({ msg: 'Rotina excluída com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const executarRotina = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Executa as automatizações das rotinas dos cômodos dos usuários.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/ExecutaRotinaDto' }
    }   
    */

    const automatizacoes = req.body as ExecutarAutomatizacaoDto[];

    try {
        const executedRotina = await playRotina(automatizacoes);
        res.status(200).json({ msg: 'Rotina executada com sucesso.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    listarTodasRotinasDev,
    listarTodasRotinas,
    listarRotinaEspecifica,
    cadastroRotina,
    habilitarRotina,
    atualizarDescricaoRotina,
    atualizarDiaSemanaRotina,
    atualizarHorarioRotina,
    removeRotina,
    executarRotina,
};
