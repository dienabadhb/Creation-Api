import express from "express";
import formatMiddleware from "./middlewares/format.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import i18nMiddleware from "./middlewares/i18n.middleware.js";


import artistRoutes from "./routes/v1/artist.routes.js";


const app = express();


app.use(express.json());
app.use(i18nMiddleware);
app.use(formatMiddleware);
app.use("/api/v1", artistRoutes);


app.use(errorHandler);

export default app;

