import Categoria from "../models/Categoria.js";

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['nombre', 'ASC']]
    });
    console.log(categorias);
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorias', detalle: err.message });
  }
}
