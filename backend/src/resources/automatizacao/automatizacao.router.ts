import { Router } from 'express';
import validarCampos from '../../middlewares/validate';
import isAuth from '../../middlewares/isAuth';
import automatizacaoController from './automatizacao.controller';
import { automatizacaoSchema } from './automatizacao.schema';

const router = Router();

router.get('/rotina/:id', isAuth, automatizacaoController.listarTodasAutomatizacoes);
router.get('/:id', isAuth, automatizacaoController.buscarAutomatizacaoEspeficica);
router.post(
    '/',
    isAuth,
    validarCampos(automatizacaoSchema),
    automatizacaoController.cadastroAutomatizacao,
);
router.put('/:id', isAuth, automatizacaoController.atualizarStatusAutomatizacao);
router.delete('/:id', isAuth, automatizacaoController.removeAutomatizacao);

export default router;
