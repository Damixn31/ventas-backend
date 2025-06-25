import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  telefono: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(100) },
  direccion: { type: DataTypes.TEXT },
  notas: { type: DataTypes.TEXT }
}, {
  tableName: 'clientes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Cliente;

