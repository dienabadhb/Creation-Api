import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Artist = db.define("Artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  bio: {
    type: DataTypes.JSON,
    allowNull: true, 
  },
});
Artist.translatableFields = ["bio"];

export default Artist;