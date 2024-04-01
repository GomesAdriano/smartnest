import Joi from 'joi';

export const usuarioSchema = Joi.object().keys({
    nome: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).max(100).required(),
});
