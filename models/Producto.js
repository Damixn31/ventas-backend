import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Categoria from './Categoria.js';

const Producto = sequelize.define('Producto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(10, 2) },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  categoria_id: { type: DataTypes.INTEGER, references: { model: 'categorias', key: 'id' } },
}, {
  tableName: 'productos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'Producto' });

export default Producto;

