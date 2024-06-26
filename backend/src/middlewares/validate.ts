import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

function validarCampos(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) res.status(422).json(error);
        else next();
    };
}

export default validarCampos;
