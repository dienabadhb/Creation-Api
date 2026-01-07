import express from "express";
import formatMiddleware from "./middlewares/format.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

// Routes
import artistRoutes from "./routes/v1/artist.routes.js"

const app = express();

// Middleware pour JSON
app.use(express.json());

// Module 1 : formats avancés
app.use(formatMiddleware);

// Routes
app.use("/api/v1", artistRoutes);

// Middleware global d'erreurs
app.use(errorHandler);

export default app;
