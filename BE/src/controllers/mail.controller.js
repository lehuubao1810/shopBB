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
  const products = req.body.products; // Assuming products is an array of product objects
  let html = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Order Details:</p>
        <ul>
    `;
  products.forEach((product) => {
    html += `
            <li>Product: ${product.productName}</li>
            <li>Quantity: ${product.quantity}</li>
            <li>Price: ${product.price}</li>
        `;
  });
  html += `
        </ul>
        <p>Order Total: ${req.body.total}</p>
        <p>Order will be delivered to: ${req.body.address}</p>
        <p> Payment Method: ${req.body.payment} </p>
        <p>Thank you for shopping with us!</p>
        <p> If you have any questions, please contact us at <a href="mailto:#">support@shop</a></p>
        <br />
        <p>Best,</p>
        <p>Shop BB</p>
    `;
  await sendMail(to, subject, text, html);
  return res.status(200).json({ success: true });
};
