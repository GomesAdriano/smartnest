import { Router } from 'express';
import tipoComodoController from './tipo.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, tipoComodoController.listarTodosTipoComodo);
router.get('/:id', isAuth, tipoComodoController.listarTipoComodoEspecifico);

export default router;
