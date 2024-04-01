import { Router } from 'express';
import categoriaController from './categoria.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, categoriaController.listarTodasCategorias);
router.get('/:id', isAuth, categoriaController.listarCategoriaEspecifica);

export default router;
