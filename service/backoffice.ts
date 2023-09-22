import {  Escenario, Estado, PrismaClient } from "@prisma/client";


export const updateEscenario = async (
  id: number,
  data: {  
    aporte_inversores?:number, 
    beneficio?:number, 
    rentabilidad?:number,  
    coste_activo?:number,  
    costo_construccion?:number,
    gestion_xperiend?:number,
    coste_desarrollo?:number,
    coste_promocion?:number,
    recursion?:number
   },
  prisma: PrismaClient
) => {
  return await prisma.escenario_economico.update({
    where: { id:id},
    data: {
      ...data,
    },
  });
};
export const getProjectById = async (id: number, prisma: PrismaClient) => {
  return await prisma.projects.findUnique({
    where: { id: id },
  });
};
export const updateFechas = async (
  id: number,
  data: {  
    fecha_inicio_reinversion?:Date | null,
    fecha_fin_venta?:Date | null,
    fecha_fin_reinversion?:Date| null,
    fecha_reclamo?:Date| null,
    fecha_inicio_intercambio?:Date| null,
    fecha_fin_intercambio?:Date| null,
    visible_user?:boolean| null,
    visible_premium?:boolean| null,
    visible_gold?:boolean| null
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
    ejecucion_proyecto?:number,
    concepto_bancario?:string
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

