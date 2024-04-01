import { Router } from 'express';
import validarCampos from '../../middlewares/validate';
import isAuth from '../../middlewares/isAuth';
import rotinaController from './rotina.controller';
import { rotinaSchema } from './rotina.schema';

const router = Router();

//router.get('/dev', rotinaController.listarTodasRotinasDev);
router.get('/comodo/:id', isAuth, rotinaController.listarTodasRotinas);
router.get('/:id', isAuth, rotinaController.listarRotinaEspecifica);
router.post('/', isAuth, validarCampos(rotinaSchema), rotinaController.cadastroRotina);
router.put(
    '/descricao/:id',
    isAuth,
    validarCampos(rotinaSchema),
    rotinaController.atualizarDescricaoRotina,
);
router.put('/dia-semana/:id', isAuth, rotinaController.atualizarDiaSemanaRotina);
router.put('/horario/:id', isAuth, rotinaController.atualizarHorarioRotina);
router.delete('/:id', isAuth, rotinaController.removeRotina);
router.post('/executar', isAuth, rotinaController.executarRotina);
router.put('/habilitar/:id', isAuth, rotinaController.habilitarRotina);

export default router;
