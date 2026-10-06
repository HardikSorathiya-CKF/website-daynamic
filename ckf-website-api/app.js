import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

/* Security */
app.use(helmet());

/* Compression */
app.use(compression());

/* Request Logger */
app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
});
app.use(morgan("dev"));

/* Body Parser */
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

/* Cookies */
app.use(cookieParser());

/* CORS */

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.WEBSITE_URL,
    "http://localhost:5173",
    "http://localhost:3000",
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true
}));

/* Test Route */

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "CloudKodeForm Backend Running 🚀"
    });

});

app.get("/db-status", (req, res) => {

    res.json({
        readyState: mongoose.connection.readyState,
        database: mongoose.connection.name
    });

});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/casestudy", caseStudyRoutes);
app.use("/api/service", serviceRoutes);

export default app;