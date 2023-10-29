import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Middleware

app.use(morgan("dev")); // for logging requests
app.use(helmet()); // for security (https://expressjs.com/en/advanced/best-practice-security.html)
app.use(compression()); // for compressing requests (https://expressjs.com/en/advanced/best-practice-performance.html)


app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
// Database

// Routes
app.use("/", (req, res) => res.send("Hello World!"));

// Handling Errors

export default app;
