import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorMiddleware.js";
import healthRoutes from "./routes/health.route.js";
import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1/health", healthRoutes );
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes)


//Error middleware 
app.use(errorHandler);
export default app;