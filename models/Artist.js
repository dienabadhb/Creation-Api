// models/Artist.js
import db from "../config/database.js";
import { DataTypes } from "sequelize";

// Définition du modèle Artist
const Artist = db.define("Artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // obligatoire
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true, // facultatif
  },
});

// Export du modèle pour l’utiliser dans les controllers
export default Artist;