import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Producto from './Producto.js';
import Cliente from './Cliente.js';

const Venta = sequelize.define('Venta', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cliente_id: { type: DataTypes.INTEGER },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  anio: { type: DataTypes.INTEGER },
  mes: { type: DataTypes.INTEGER },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  moneda: { type: DataTypes.ENUM('ARS', 'USD'), allowNull: false },
  forma_pago: { type: DataTypes.ENUM('efectivo', 'transferencia', 'mp', 'otro') },
  costo_unitario: { type: DataTypes.DECIMAL(10, 2) },
  precio_unitario: { type: DataTypes.DECIMAL(10, 2) },
  ganancia: { type: DataTypes.DECIMAL(10, 2) },
  notas: { type: DataTypes.TEXT }
}, {
  tableName: 'ventas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Venta.belongsTo(Producto, { foreignKey: 'producto_id', as: 'Producto' });
Producto.hasMany(Venta, { foreignKey: 'producto_id', as: 'Ventas' });

Venta.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'Cliente' });
Cliente.hasMany(Venta, { foreignKey: 'cliente_id' });

export default Venta;
