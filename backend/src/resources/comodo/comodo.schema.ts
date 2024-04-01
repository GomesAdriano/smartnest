import Joi, { Schema } from 'joi';
import { acoesDto } from './comodo.types';

export const comodoSchema: Schema = Joi.object().keys({
    descricao: Joi.string().min(3).max(100).required(),
    tipoComodoId: Joi.number().min(1).required(),
});

export const addRmvUnidadeDispositivoComodoSchema: Schema = Joi.object().keys({
    acao: Joi.string().valid(acoesDto.ADICIONAR, acoesDto.REMOVER).required(),
    dispId: Joi.string().required(),
});
