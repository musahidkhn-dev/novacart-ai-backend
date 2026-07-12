import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorMiddleware.js";
import healthRoutes from "./routes/health.route.js";
import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import variantRoutes from "./routes/variantRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1/health", healthRoutes );
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/variants", variantRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/orders", orderRoutes);




//Error middleware 
app.use(errorHandler);
export default app;