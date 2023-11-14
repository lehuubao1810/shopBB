import express from "express";

import { sendOTP, sendOrder } from "../controllers/mail.controller.js";

const routerMail = express.Router();

// send OTP
routerMail.post("/send-otp", sendOTP);

// send order
routerMail.post("/send-order", sendOrder);

export default routerMail;
