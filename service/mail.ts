import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { updateUserAuthToken } from "./user";

dotenv.config();

export const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.PASSEMAIL,
  },
  secure: true,
});

export async function sendAuthEmail(email: string, authCode: string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE VALIDACION",
    html: `<h2 style="color:#23262F;">Código de validación.</h2><h3 style="color:#6E7786;">Código de validación: ${authCode}</h3>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendWelcomeEmail(email: string,referallCode:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido a XPERIEND",
    html: `<h2 style="color:#23262F;">Mensaje de bienvenida.</h2><h3 style="color:#6E7786;">Bienvenido a Xperiend tu codigo de referido es tu username ${referallCode}</h3>`,
  };
  return transporter.sendMail(mailData);
}
