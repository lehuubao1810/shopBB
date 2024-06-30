import {google} from 'googleapis';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (to, subject, text, html) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'tronglh8345@ut.edu.vn',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            from: '"Shop BB" <tronglh8345@ut.edu.vn>',
            to: to,
            subject: subject,
            text: text,
            html: html
        }
        const result = await transport.sendMail(mailOptions);
    }
    catch (error){
        console.log(error);
    }
}

export default sendMail;