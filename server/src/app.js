import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectMongoDB from "./dbs/init.mongodb.js";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

// Middleware

app.use(morgan("dev")); // for logging requests
app.use(helmet()); // for security (https://expressjs.com/en/advanced/best-practice-security.html)
app.use(compression()); // for compressing requests (https://expressjs.com/en/advanced/best-practice-performance.html)

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
// Database
connectMongoDB();

// CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Chỉ cho phép truy cập từ domain này
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Bật hỗ trợ cookies trên CORS requests
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

// Routes
app.use("/api", router);

// Handling Errors

export default app;
