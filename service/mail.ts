import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import mustache from "mustache";

dotenv.config();

export const transporter = nodemailer.createTransport({
  port: 587, // true for 465, false for other ports
  host: "smtp.dondominio.com",
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.PASSEMAIL,
  },
  secure: false,
});

export async function sendAuthEmail(
  email: string,
  authCode: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/emails-user/Gestion User - Login con codigo de acceso.html",
    "utf-8"
  );
  const data = {
    authCode,
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE VALIDACION",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendWelcomeEmailSinSubs(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails-user/Gestion User - Registro bienvenida sin suscripcion.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido a XPERIEND",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendWelcomeEmailConSubs(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails-user/Gestion User - Registro bienvenida con suscripcion.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido a XPERIEND",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendCompraTransferenciaEmailXREN(
  email: string,
  username: string,
  numeroDecuenta: string,
  banco: string,
  titular: string,
  concepto: string,
  euros: string
) {
  const plantilla = fs.readFileSync(
    "emails/emails - Compra XREN/Compra XREN - Pendiente transferencia.html",
    "utf-8"
  );
  const data = {
    username,
    numeroDecuenta,
    banco,
    concepto,
    titular,
    euros,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Compra de participacion, pago pendiente",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendPagoCanceladoXREN(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Compra XREN/Compra XREN - Compra anulada.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: `Su pago ha sido cancelado`,
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendPagoDevueltoXREN(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Compra XREN/Compra XREN - Compra anulada.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: `Su pago ha sido devuelto`,
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendRecoverCode(
  email: string,
  authCode: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/emails-user/Gestion User - Reset password.html",
    "utf-8"
  );
  const data = {
    username,
    authCode,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE RECUPERACION DE CONTRASENA",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendKycAprobado(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Gestion KYC/Gestion KYC - Aprobado.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Su KYC ha sido aprobado",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendKycRechazado(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Gestion KYC/Gestion KYC - Rechazado.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Su KYC ha sido rechazado",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendKycRellenado(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Gestion KYC/Gestion KYC - Rellenado.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Su KYC esta pendiente",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendTransferenciaRecibidaParticipaciones(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Venta/Venta INVESTHOME - Transferencia recibida.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Transferencia recibida!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function sendWelcomeClub(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/emails - Compra XREN/Compra XREN - Compra acceso club.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido al Club Xperiend",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function sendTransferenciaPendienteParticipaciones(
  email: string,
  username: string,
  numeroDeCuenta: string,
  banco: string,
  titular: string,
  concepto: string,
  euros: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Venta/Venta INVESTHOME - Pendiente transferencia.html",
    "utf-8"
  );
  const data = {
    username,
    numeroDeCuenta,
    titular,
    concepto,
    euros,
    banco,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Transferencia pendiente!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function compraRealizadaInvesthome(
  email: string,
  username: string,
  titulo_proyecto: string,
  urlNFT: string,
  urlDescargarContrato?: string | null,
  urlImage?: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Venta/Venta INVESTHOME - Compra Realizada.html",
    "utf-8"
  );
  const data = {
    username,
    titulo_proyecto,
    urlDescargarContrato,
    urlImage,
    urlNFT,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Compra realizada!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

///// VOOOY POR AQUI
export async function compraAnuladaNoFirma(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Venta/Venta INVESTHOME - Compra anulada - No Firma.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Compra anulada, no ha firmado!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function compraAnuladaNoPagado(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Venta/Venta INVESTHOME - Compra anulada - No transfer.htmll",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Compra anulada, no ha pagado!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioAnuladoComprador(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio anulado- Comprador.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio anulado!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioAnuladoVendedor(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio anulado- Vendedor.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio anulado!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioFirmeConfirmacion(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio Firme confirmacion - Vendedor.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio firma vendedor!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioPeticionComprador(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio peticion - Comprador.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio peticion comprador!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioPeticionVendedor(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio peticion - Vendedor.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio peticion vendedor!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function intercambioRealizadoComprador(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio realizado - Comprador.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio realizado comprador!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function intercambioRealizadoVendedor(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio realizado - Vendedor.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio realizado vendedor!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function intercambioTransferenciaPendiente(
  email: string,
  username: string,
  banco: string,
  numeroDeCuenta: string,
  concepto: string,
  titular: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio transferencia pendiente- Comprador.html",
    "utf-8"
  );
  const data = {
    username,
    banco,
    numeroDeCuenta,
    concepto,
    titular,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio transferencia pendiente!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function intercambioTransferenciaRecibida(
  email: string,
  username: string
) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Intercambio/Gestion Intercambio - Intercambio Transferencia recibida- Comprador.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Intercambio transferencia recibida!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function reinversionRealizada(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Fin proyecto/Gestion Fin proyecto - Reinversion realizada.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Reinversion realizada!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function reclamacionPeticion(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Fin proyecto/Gestion Fin proyecto- Reclamacion peticion.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Peticion de reclamacion!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}

export async function reclamacionRealizada(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Fin proyecto/Gestion Fin proyecto- Reclamacion realizada.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Reclamacion realizada!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
export async function reinversionPeticion(email: string, username: string) {
  const plantilla = fs.readFileSync(
    "emails/Gestion Investhome Fin proyecto/Gestion Fin proyecto- Reinversion peticion.html",
    "utf-8"
  );
  const data = {
    username,
  };
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Peticion de reinversion!",
    html: mustache.render(plantilla, data),
  };
  return transporter.sendMail(mailData);
}
