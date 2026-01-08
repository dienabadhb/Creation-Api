import app from "./app.js";
import db from "./config/database.js";

const PORT = process.env.PORT || 3000;

try {
  await db.authenticate(); // vérifie la connexion à la DB
  console.log("✅ Database connected");

  await db.sync({ alter: true }); // crée ou met à jour les tables
  console.log("✅ Tables synchronized");

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
} catch (err) {
  console.error("❌ DB error:", err);
}
