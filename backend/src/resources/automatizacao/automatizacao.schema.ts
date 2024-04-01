import Joi, { Schema } from 'joi';

export const automatizacaoSchema: Schema = Joi.object().keys({
    rotinaId: Joi.string().required(),
    unidadeDispositivoId: Joi.string().required(),
    status: Joi.boolean().required(),
});
