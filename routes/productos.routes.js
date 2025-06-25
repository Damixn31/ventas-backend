import express from 'express';
import { 
  getProductos,
  createProducto,
  getProductoById,
  updateProducto,
  deleteProducto,
  } from '../controllers/productos.controllers.js';

const router = express.Router();

router.get('/', getProductos);
router.post('/', createProducto);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;
