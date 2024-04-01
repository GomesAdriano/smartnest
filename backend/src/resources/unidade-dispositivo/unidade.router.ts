import { Router } from 'express';
import unidadeController from './unidade.controller';
import isAuth from '../../middlewares/isAuth';
import validarCampos from '../../middlewares/validate';
import { unidadeDispositivoSchema } from './unidade.schema';

const router = Router();

// Rota para os devs verificarem os dados das unidades de dispositivos
//router.get('/dev', unidadeController.listarTodasUnidadesDispositivoDev);
router.get('/', isAuth, unidadeController.listarTodasUnidadesDispositivo);
router.get('/sem-comodo', isAuth, unidadeController.listarTodasUnidadesDispositivoSemComodo);
router.get('/:id', isAuth, unidadeController.listarUnidadeDispositivoEspecifico);
router.post(
    '/',
    isAuth,
    validarCampos(unidadeDispositivoSchema),
    unidadeController.cadastroUnidadeDispositivo,
);
router.put(
    '/:id',
    isAuth,
    validarCampos(unidadeDispositivoSchema),
    unidadeController.atualizarUnidadeDispositivo,
);
router.put('/status/:id', isAuth, unidadeController.atualizarStatusUnidadeDispositivo);
router.delete('/:id', isAuth, unidadeController.removeUnidadeDispositivo);

export default router;
