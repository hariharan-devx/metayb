import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import CustomError from "./src/utils/CustomError.js";
import globalErrorHandler from "./src/controllers/errorController.js";
import healthRoute from "./src/routes/healthRoute.js";
import authRoue from "./src/routes/authRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import cartRoute from "./src/routes/cartRoute.js";

let app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  }),
);

let limitter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "We have received too many requests from this IP. Please try after one hour.",
});

app.use("/", limitter);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "assets/uploads")));

app.use(healthRoute);
app.use(authRoue);
app.use(categoryRoute);
app.use(productRoute);
app.use(cartRoute);

app.use((req, res, next) => {
  const err = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
  next(err);
});

app.use(globalErrorHandler);

export default app;
