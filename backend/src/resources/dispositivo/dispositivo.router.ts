import { Router } from 'express';
import dispositivosController from './dispositivo.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, dispositivosController.listarTodosDispositivos);
router.get('/:id', isAuth, dispositivosController.listarDispositivoEspecifico);
router.get(
    '/categoria/:id',
    isAuth,
    dispositivosController.listarDispositivosDeCategoriaEspecifica,
);

export default router;
