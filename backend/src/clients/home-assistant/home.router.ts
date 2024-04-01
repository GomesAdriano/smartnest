import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import homeAssistant from './home.assistant';

const router = Router();

// Rota para os devs verificarem os dados das unidades de dispositivos
router.get('/', isAuth, homeAssistant.listarUnidadesDispositivo);
router.put('/state/:entity_id', isAuth, homeAssistant.atualizarStatusUnidadeIntegrado);

export default router;
