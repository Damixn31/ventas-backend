import express from 'express';
import { getCategorias } from '../controllers/categorias.controllers.js';

const router = express.Router();

router.get('/', getCategorias);

export default router;
