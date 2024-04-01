import Joi from 'joi';

export const authSchema = Joi.object().keys({
    email: Joi.string().required(),
    senha: Joi.string().required(),
});
