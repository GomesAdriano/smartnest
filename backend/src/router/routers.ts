import { Router } from 'express';
import authRouter from '../resources/auth/auth.router';
import usuarioRouter from '../resources/usuario/usuario.router';
import categoriaDispositivoRouter from '../resources/categoria-dispositivo/categoria.router';
import dispositivoRouter from '../resources/dispositivo/dispositivo.router';
import unidadeDispositivoRouter from '../resources/unidade-dispositivo/unidade.router';
import tipoComodoRouter from '../resources/tipo-comodo/tipo.router';
import comodoRouter from '../resources/comodo/comodo.router';
import rotinaRouter from '../resources/rotina/rotina.router';
import automatizacaoRouter from '../resources/automatizacao/automatizacao.router';
import homeAssistantRouter from '../clients/home-assistant/home.router';

const router = Router();

router.use(
    '/auth',
    // #swagger.tags = ['Auth']
    authRouter
);

/*
router.use(
    '/usuario',
    // #swagger.tags = ['Usuário']
    usuarioRouter
);
*/

router.use(
    '/categoria-dispositivo',
    // #swagger.tags = ['Categoria de Dispositivo']
    categoriaDispositivoRouter
);

router.use(
    '/dispositivo',
    // #swagger.tags = ['Dispositivo Predefinido']
    dispositivoRouter
);

router.use(
    '/tipo-comodo',
    // #swagger.tags = ['Tipo de Cômodo']
    tipoComodoRouter
);

router.use(
    '/comodo',
    // #swagger.tags = ['Cômodo']
    comodoRouter
);

router.use(
    '/unidade-dispositivo',
    // #swagger.tags = ['Unidade de Dispositivo']
    unidadeDispositivoRouter
);

router.use(
    '/rotina',
    // #swagger.tags = ['Rotina']
    rotinaRouter
);

router.use(
    '/automatizacao',
    // #swagger.tags = ['Automatização']
    automatizacaoRouter
);

router.use('/home-assistant', homeAssistantRouter);

export default router;
