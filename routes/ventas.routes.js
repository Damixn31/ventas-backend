import express from 'express';
import { 
  registerVenta, 
  getVentaPorMes,
  filterVentasPorPeriodo,
  filtrarVentas,
  getAllVentas,
  getGananciaMensual,
  getTopProductos,
  getDistribucionFormasPago,
  getIngresosPorMoneda,
} from '../controllers/venta.controllers.js'; 

const router = express.Router();

router.get('/ventas', getAllVentas);
router.get('/ventas/mes', getVentaPorMes);
router.get('/ventas/filtrar', filtrarVentas);
router.get('/ventas/periodo', filterVentasPorPeriodo);
router.get('/ventas/ganancia-mensual', getGananciaMensual);
router.get('/ventas/top-productos', getTopProductos);
router.get('/ventas/formas-pago', getDistribucionFormasPago);
router.get('/ventas/ingresos-moneda', getIngresosPorMoneda);

router.post('/ventas', registerVenta);

export default router;
