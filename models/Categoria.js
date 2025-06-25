import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  descripcion: { type: DataTypes.TEXT }
}, {
  tableName: 'categorias',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Categoria;
