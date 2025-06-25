import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Producto from './Producto.js';

const Ingreso = sequelize.define('Ingreso', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_compra: { type: DataTypes.DECIMAL(10, 2) },
  proveedor: { type: DataTypes.STRING(100) },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  notas: { type: DataTypes.TEXT }
}, {
  tableName: 'ingresos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Ingreso.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(Ingreso, { foreignKey: 'producto_id' });

export default Ingreso;

