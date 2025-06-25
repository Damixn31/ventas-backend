import Venta from '../models/Venta.js';
import Cliente from '../models/Cliente.js';
import Producto from '../models/Producto.js';
import Categoria from '../models/Categoria.js';
import { Op, fn, col, literal } from 'sequelize';


export const getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        {
          model: Producto,
          as: 'Producto',
          include: [{
            model: Categoria,
            as: 'Categoria'
          }]
        },
        {
          model: Cliente,
          as: 'Cliente'
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener todas las ventas', detalle: err.message });
  }
};

// para el formulario
export const filtrarVentas = async (req, res) => {
  const { producto, categoria, desde, hasta, forma_pago, moneda } = req.query;

  try {
    const ventas = await Venta.findAll({
      where: {
        ...(forma_pago && { forma_pago }),
        ...(moneda && { moneda }),
        ...(desde && hasta && { fecha: { [Op.between]: [desde, hasta] } }),
        ...(desde && !hasta && { fecha: { [Op.gte]: desde } }),
        ...(!desde && hasta && { fecha: { [Op.lte]: hasta } }),
      },
      include: [
    {
      model: Producto,
      as: 'Producto',  
      where: {
        ...(producto && { nombre: { [Op.like]: `%${producto}%` } }),
      },
      include: categoria ? [{
        model: Categoria,
        as: 'Categoria',  
        where: {
          nombre: { [Op.like]: `%${categoria}%` }
        }
      }] : []
    }
  ]
    });
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar las ventas', detalle: err.message });
  }
};

// para analisis de ventas por mes y año
export const filterVentasPorPeriodo = async (req, res) => {
  try {
    const { mes, anio, cliente_id, producto_id, forma_pago } = req.query;

    const whereClause = {};

    if (mes) whereClause.mes = parseInt(mes);
    if (anio) whereClause.anio = parseInt(anio);
    if (cliente_id) whereClause.cliente_id = cliente_id;
    if (producto_id) whereClause.producto_id = producto_id;
    if (forma_pago) whereClause.forma_pago = forma_pago;

    const ventas = await Venta.findAll({
      where: whereClause,
      include: [
        { model: Producto, attributes: ['id', 'nombre'] },
        { model: Cliente, attributes: ['id', 'nombre'] }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas', detalle: err.message });
  }
};


// reqistrar nuevas ventas
export const registerVenta = async (req, res) => {
  try {
    const {
      producto_id, 
      cliente_id, 
      fecha,
      cantidad,
      moneda,
      forma_pago,
      costo_unitario,
      precio_unitario,
      ganancia,
      notas
    } = req.body;
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth() + 1;
    const anio = fechaObj.getFullYear();

    const nuevaVenta = await Venta.create({
      producto_id,
      cliente_id,
      fecha,
      cantidad,
      moneda,
      forma_pago,
      costo_unitario,
      precio_unitario,
      ganancia,
      notas,
      mes,
      anio
    });
    res.status(201).json({ message: 'Venta registrada', venta: nuevaVenta });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar la venta', detalle: err.message });
  }
};


// obtener ventas por mes y año esto es para el dashboard 
export const getVentaPorMes = async (req, res) => {
  try {
    const { mes, anio } = req.query;
    const whereClause = {};
    if (mes) whereClause.mes = parseInt(mes);
    if (anio) whereClause.anio = parseInt(anio);

    const ventas = await Venta.findAll({
      where: whereClause,
      include: [
        { model: Producto, as: 'Producto', attributes: ['nombre'] },
        { model: Cliente, as: 'Cliente', attributes: ['nombre'] }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas', detalle: err.message });
  }
};


// ganancias mensaulaes para el dashboard
export const getGananciaMensual = async (req, res) => {
  const {anio} = req.query;

  try {
    const resumen = await Venta.findAll({
      attributes: [
        [fn('MONTH', col('fecha')), 'mes'],
        [fn('SUM', col('ganancia')), 'total_ganancia']
      ],
      where: {
        ...(anio && {anio: parseInt(anio) })
      },
      group: [fn('MONTH', col('fecha'))],
      order: [[fn('MONTH', col('fecha')), 'ASC']]
    });
    res.json(resumen);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ganancias mensuales', detalle: err.message });
  }
}

export const getTopProductos = async (req, res) => {
  try {
    const top = await Venta.findAll({
      attributes: [
        'producto_id',
        [fn('SUM', col('cantidad')), 'total_vendidos']
      ],
      include: [{
        model: Producto,
        as: 'Producto',
        attributes: ['nombre']
      }],
      group: ['producto_id', 'Producto_id'],
      order: [[fn('SUM', col('cantidad')), 'DESC']],
      limit: 5 // aca puedo poner mas si quiero
    });
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos más vendidos', detalle: err.message});
  }
}

export const getDistribucionFormasPago = async (req, res) => {
  try {
    const formas = await Venta.findAll({
      attributes: [
        'forma_pago',
        [fn('COUNT', col('forma_pago')), 'cantidad']
      ],
      group: ['forma_pago']
    });
    res.json(formas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener formas de pago', detalle: err.message});
  }
};

export const getIngresosPorMoneda = async (req, res) => {
  try {
    const ingresos = await Venta.findAll({
      attributes: [
        'moneda',
        [fn('SUM', literal('precio_unitario * cantidad')), 'total_ingreso']
      ],
      group: ['moneda']
    });

    res.json(ingresos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingresos por moneda', detalle: err.message });
  }
};


