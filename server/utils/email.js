import { transporter } from "../config/nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const backendurl = 'http://localhost:3000';


export const sendResetEmail = () => {
    const resetUrl = `${backendurl}/users/reset-password/${token}`;
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `You requestd a password reset. Click here to reset your password. ${resetUrl}`,

    };

transporter.sendMail(mailOptions, (error,info) => {
    if(error){
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


};