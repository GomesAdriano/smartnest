import { Router } from 'express';
import comodoController from './comodo.controller';
import isAuth from '../../middlewares/isAuth';
import validarCampos from '../../middlewares/validate';
import { comodoSchema, addRmvUnidadeDispositivoComodoSchema } from './comodo.schema';

const router = Router();

// Rota para os devs verificarem os dados dos comodos dos usuarios
//router.get('/dev', comodoController.listarTodosComodosDev);
router.get('/', isAuth, comodoController.listarTodosComodos);
router.get('/:id', isAuth, comodoController.listarComodoEspecifico);
router.post('/', isAuth, validarCampos(comodoSchema), comodoController.cadastroComodo);
router.put('/:id', isAuth, validarCampos(comodoSchema), comodoController.atualizarComodo);
router.delete('/:id', isAuth, comodoController.removeComodo);

router.put(
    '/add-rmv-unidade-dispositivo/:comodoId',
    isAuth,
    validarCampos(addRmvUnidadeDispositivoComodoSchema),
    comodoController.adicionarOuRemoverUnidadeDispositivoAoComodo,
);

export default router;
