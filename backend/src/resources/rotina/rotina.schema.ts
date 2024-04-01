import Joi, { Schema } from 'joi';

export const rotinaSchema: Schema = Joi.object().keys({
    descricao: Joi.string().min(3).max(100).required(),
    comodoId: Joi.string().optional(),
});
