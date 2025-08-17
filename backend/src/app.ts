import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";

import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
const baseApi = "/api/v1/en";

app.use(`${baseApi}/users`, userRoutes);
app.use(`${baseApi}/products`, productRoutes);
app.use(`${baseApi}/categories`, categoryRoutes);

// Error handler
app.use(errorHandler);

export default app;
