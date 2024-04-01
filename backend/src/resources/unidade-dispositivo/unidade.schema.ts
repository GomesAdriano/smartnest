import Joi, { Schema } from 'joi';

export const unidadeDispositivoSchema: Schema = Joi.object().keys({
    descricao: Joi.string().min(3).max(100).required(),
    dispositivoId: Joi.number().min(1).required(),
});
