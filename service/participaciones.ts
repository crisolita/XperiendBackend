import {  EstadoPagoYFirma, PrismaClient } from "@prisma/client";



export const getGestionByPorjectId = async (id: number, prisma: PrismaClient) => {
  return await prisma.gestion_fechas.findUnique({
    where: { project_id: id },
  });
};
export const getCuentaById = async (id: number, prisma: PrismaClient) => {
  return await prisma.cuentas.findUnique({
    where: { id: id },
  });
};
export const getOrderById = async (id: number, prisma: PrismaClient) => {
  return await prisma.orders.findUnique({
    where: { id: id },
  });
};
export const updateFechas = async (
  id: number,
  data: {  
    fecha_proximamente?:Date,
    fecha_publico?:Date,
    fecha_abierto?:Date,
    fecha_cerrado?:Date,
    fecha_en_proceso?:Date,
    fecha_reinversion?:Date,
    fecha_terminado?:Date
   },
  prisma: PrismaClient
) => {
  return await prisma.gestion_fechas.update({
    where: { project_id: Number(id)},
    data: {
      ...data,
    },
  });
};
export const updateOrder = async (
  id: number,
  data: {  
    documentId?:string,
    status?:EstadoPagoYFirma,
    nft_id?:number
   },
  prisma: PrismaClient
) => {
  return await prisma.orders.update({
    where: { id: Number(id)},
    data: {
      ...data,
    },
  });
};
export const updateProject = async (
  id: number,
  data:{
    cuenta_id?: number,
    cantidadInicial?:number,
    cantidadRestante?:number,
    precio_unitario?:number,
    beneficioPorNFT?:number,
    proyectoReinversion?:number,
    rentabilidad_estimada?:number,
    beneficio_estimado?:number,
    plazo_ejecucion?:number,
    ejecucion_proyecto?:number
  },
  prisma: PrismaClient
) => {
  return await prisma.projects.update({
    where: { id: Number(id)},
    data: {
      ...data
    },
  });
};
// export const crearDocumentoDeCompra = async (
//   user_id: number,
//   project_id:number,
//   prisma:PrismaClient
// ) => {
//   const project= await getProjectById(project_id,prisma)
//   const user= await getUserById(user_id,prisma)
//   const doc = new PDFDocument();
// const path=`Contrato_de_compra_${project_id}_${user_id}.pdf`
// doc.pipe(fs.createWriteStream(path));

// // Agregar texto e imagen del código QR al PDF
// doc.fontSize(18).text('Documento de compra', { align: 'center' });
// doc.text(`Proyecto: ${project?.titulo}`);
// doc.text(`usuario: ${user?.userName}`);
// doc.text(`Fecha: ${new Date()}`);
// doc.text(`Costo de la participacion: ${project?.precio_unitario}`);
// return doc;
// };
// Crear un nuevo documento PDF


