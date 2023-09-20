import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { getProjectById } from "../service/backoffice";
import moment from "moment";
import { createCharge } from "../service/stripe";
import { getCuentaById, getGestionByPorjectId, getOrderById, getTotalBalanceStake, getTotalBalanceVenta } from "../service/participaciones";
import { crearPago } from "../service/pagos";
import { sendCompraTransferenciaEmail } from "../service/mail";
import {  crearDocumentoDeCompra } from "../service/pandadoc";
import { getKycInfoByUser } from "../service/user";
export const compraParticipacionStripe = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
      const {project_id,cardNumber,exp_month,exp_year,cvc}= req.body;
      const project=await getProjectById(project_id,prisma)
      const gestion= await getGestionByPorjectId(project_id,prisma)
      const kycInfo=await getKycInfoByUser(USER.id,prisma)
      if(!kycInfo) return res.json({error:"Kyc no encontrado"})
    //   const tipoDeUser= await getTipoDeUser(kycInfo?.wallet,project_id,prisma)
      if(!project || !gestion || !project.precio_unitario) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      if(project.cantidadRestante==0) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const now= moment()
    //   if(!now.isBetween(moment(gestion.fecha_abierto),moment(gestion.fecha_en_proceso)) || project.estado!=="ABIERTO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
      
        /// Cargo en stripe
        // const charge= await createCharge(USER.id,cardNumber,exp_month,exp_year,cvc,(project.precio_unitario*100).toString(),prisma)
        // if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
      const pago = await crearPago(USER.id,project.precio_unitario,"TARJETA_DE_CREDITO",new Date(),"Compra de participacion",prisma)
      const documentID= await crearDocumentoDeCompra(USER.id,project.id,prisma)
      const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        project_id:project.id,
        document_id:documentID,
        status:"POR_FIRMAR"
        }
    })
      return res.status(200).json({ data:{pago,order} });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const compraParticipacionTransferenciaBancaria = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
      const {project_id}= req.body;
      const project=await getProjectById(project_id,prisma)
      const gestion= await getGestionByPorjectId(project_id,prisma)
      if(!project || !gestion || !project.precio_unitario || !project.cuenta_id) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      if(project.cantidadRestante==0) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const now= moment()
    //   if(!now.isBetween(moment(gestion.fecha_abierto),moment(gestion.fecha_en_proceso)) || project.estado!=="ABIERTO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
      const cuenta= await getCuentaById(project.cuenta_id,prisma)
      if(!cuenta) return res.status(404).json({error:"Cuenta bancaria no encontrada"})
      await sendCompraTransferenciaEmail(USER.email,cuenta.numero,cuenta.banco,project.precio_unitario,project.titulo,project.concepto_bancario? project.concepto_bancario :"Compra NFT")
        const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        project_id:project.id,
        status:"PAGO_PENDIENTE",
        fecha:new Date()
        }
    })

      return res.status(200).json({ data:{order,concepto:project.concepto_bancario,numero:cuenta.numero,banco:cuenta.banco} });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const prueba = async (req: Request, res: Response) => {
    try {
    //   // @ts-ignore
    //   const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    // const USER= req.user as User;
    // await getTotalBalanceVenta("0x8068dbC41e2f1C988EB0399da5C44F43b5e646C1")
    await getTotalBalanceStake("0x8068dbC41e2f1C988EB0399da5C44F43b5e646C1")
    res.json("prueba")
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

 