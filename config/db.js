//import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;

//const db = mysql.createPool({
//  host: HOST,
//  user: USER,
//  password: PASS,
//  database: DATABASE
//});


// uso nada mas sequelize para la conexión con la base de datos manejar los controladores y hacer los modelos

const sequelize = new Sequelize(DATABASE, USER, PASS, {
  host: HOST,
  dialect: 'mariadb',
  logging: false
});

export default sequelize;
