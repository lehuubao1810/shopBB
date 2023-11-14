import sendMail from "../services/mail.services.js";
import Client from "../models/client.model.js";

export const sendOTP = async (req, res) => {
    const OTP = Math.floor(Math.random() * 1000000);
    const to = req.body.email;
    const subject = "OTP";
    const text = "OTP";
    const html = `<p>Your OTP is: ${OTP}</p>`;
    const newClient = await Client.create({ email: to, otp: OTP });
    if (!newClient) {
        return res.status(400).json({ success: false, error: err });
    }
    await sendMail(to, subject, text, html);
    return res.status(200).json({ success: true, data: OTP });
};

export const sendOrder = async (req, res) => {
    const to = req.body.email;
    const subject = "Order";
    const text = "Order";
    const html = `<p>Your order is: ${req.body.order}</p>`;
    await sendMail(to, subject, text, html);
    return res.status(200).json({ success: true });
};
