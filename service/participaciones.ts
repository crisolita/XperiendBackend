import {  EstadoPagoYFirma, PrismaClient } from "@prisma/client";
import { StakeContract, XRENContract } from "./web3";



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
    fecha_inicio_reinversion?:Date,
        fecha_fin_reinversion?:Date,
        fecha_reclamo?:Date,
        fecha_inicio_intercambio?:Date,
        fecha_fin_intercambio?:Date
        visible_user?:boolean,
        visible_premium?:boolean,
        visible_gold?:boolean
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


export const getFechaDeVentaInicial= async (wallet:string,project_id:number,prisma:PrismaClient) => {
const balanceXREN= await XRENContract.functions.balanceOf(wallet)
const idStake= await StakeContract.functions.currentIdStake()
const isInStake= await StakeContract.functions.isUserInStake(wallet,idStake)
let balanceStake=0;
if(isInStake) {
 balanceStake=(await StakeContract.functions.infoStakeByUser(idStake,wallet)).balance;
} else {

}
}