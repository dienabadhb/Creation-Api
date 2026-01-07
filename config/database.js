import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // met à true si tu veux voir les requêtes SQL
});

export default db;
