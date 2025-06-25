import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Venta from './Venta.js';

const Pago = sequelize.define('Pago', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  venta_id: { type: DataTypes.INTEGER, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  metodo: { type: DataTypes.ENUM('efectivo', 'transferencia', 'mp', 'otro') },
  observaciones: { type: DataTypes.TEXT }
}, {
  tableName: 'pagos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Pago.belongsTo(Venta, { foreignKey: 'venta_id' });
Venta.hasMany(Pago, { foreignKey: 'venta_id' });

export default Pago;
