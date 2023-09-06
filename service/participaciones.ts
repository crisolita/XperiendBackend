import {  PrismaClient } from "@prisma/client";


export const getGestionByPorjectId = async (id: number, prisma: PrismaClient) => {
  return await prisma.gestion_fechas.findUnique({
    where: { project_id: id },
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

