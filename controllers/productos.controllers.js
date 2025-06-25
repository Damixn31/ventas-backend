import Producto from '../models/Producto.js';
import Categoria from '../models/Categoria.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: Categoria,
        attributes: ['id', 'nombre']
      }
    });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos', detalle: err.message });
  }
};

// Crear nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { nombre, categoria_id, precio_unitario, stock } = req.body;
    const nuevo = await Producto.create({ nombre, categoria_id, precio_unitario, stock });
    res.status(201).json({ message: 'Producto creado', producto: nuevo });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto', detalle: err.message });
  }
};

// Obtener producto por ID
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
      include: {
        model: Categoria,
        attributes: ['id', 'nombre']
      }
    });

    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto', detalle: err.message });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria_id, precio_unitario, stock } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.update({ nombre, categoria_id, precio_unitario, stock });
    res.json({ message: 'Producto actualizado', producto });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto', detalle: err.message });
  }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.destroy({ where: { id } });

    if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto', detalle: err.message });
  }
};

