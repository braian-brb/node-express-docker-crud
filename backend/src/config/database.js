import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 3306, // Este es el puerto dentro del contenedor, no necesitas cambiarlo
    dialect: 'mysql',
  }
);

export default sequelize;

