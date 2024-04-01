import { Router } from 'express';
import authController from './auth.controller';
import { usuarioSchema } from '../usuario/usuario.schemas';
import { authSchema } from './auth.schema';
import validarCampos from '../../middlewares/validate';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.post('/', validarCampos(usuarioSchema), authController.cadastroUsuario);
router.put('/', validarCampos(authSchema), authController.login);
router.delete('/', isAuth, authController.logout);

export default router;
