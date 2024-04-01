import { Router } from 'express';
import usuarioController from './usuario.controller';

const router = Router();

router.get('/', usuarioController.listarTodosUsuarios);
router.get('/:id', usuarioController.listarUsuarioEspecifico);

export default router;
