import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Producto from './Producto.js';

const HistorialStock = sequelize.define('HistorialStock', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  tipo: { type: DataTypes.ENUM('entrada', 'salida', 'ajuste'), allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  motivo: { type: DataTypes.TEXT },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'historial_stock',
  timestamps: false
});

HistorialStock.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(HistorialStock, { foreignKey: 'producto_id' });

export default HistorialStock;
