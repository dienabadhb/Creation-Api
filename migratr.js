import db from "./config/database.js";
import "./models/Artist.js"; 

const migrate = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database synchronized");
    process.exit(0);
  } catch (err) {
    console.error(" Migration failed:", err);
    process.exit(1);
  }
};

migrate();