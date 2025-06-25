import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ResumenMensual = sequelize.define('ResumenMensual', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  anio: { type: DataTypes.INTEGER },
  mes: { type: DataTypes.INTEGER },
  total_ventas: { type: DataTypes.DECIMAL(10, 2) },
  total_ganancia: { type: DataTypes.DECIMAL(10, 2) },
  creado: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'resumen_mensual',
  timestamps: false
});

export default ResumenMensual;
