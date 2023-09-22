import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { getProjectById } from "../service/backoffice";
import moment from "moment";
import { createCharge } from "../service/stripe";
import { getCuentaById,  getFechaDeVentaInicial,  getGestionByProjectId, getOrderById, getTotalBalanceStake, getTotalBalanceVenta } from "../service/participaciones";
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
      const {project_id,cardNumber,exp_month,exp_year,cvc,cantidad}= req.body;
      const project=await getProjectById(project_id,prisma)
      const gestion= await getGestionByProjectId(project_id,prisma)
      const kycInfo= await getKycInfoByUser(USER.id,prisma)
      const template_id=await prisma.templates.findFirst({where:{project_id,document_type:"COMPRA"}})

      if(!template_id) return res.status(404).json({error:"No template id encontrado"})
      if(!project || !gestion || !project.precio_unitario || !kycInfo?.wallet || !project.cantidadRestante || !gestion.fecha_fin_venta) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      if(project.cantidadRestante<cantidad) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const fecha_abierto_por_usuario= await getFechaDeVentaInicial(kycInfo.wallet,project?.id,prisma)
      const now= moment()

      if(!now.isBetween(moment(fecha_abierto_por_usuario),moment(gestion.fecha_fin_venta)) || project.estado!=="PUBLICO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
        /// Cargo en stripe
        const charge= await createCharge(USER.id,cardNumber,exp_month,exp_year,cvc,project.precio_unitario*100*cantidad.toString(),prisma)
        if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
      const pago = await crearPago(USER.id,project.precio_unitario*cantidad,"TARJETA_DE_CREDITO",new Date(),"Compra de participacion",prisma)
     
      const documentID= await crearDocumentoDeCompra(USER.id,project.id,template_id.id,prisma)
      if(!documentID) return res.status(500).json({error:"Falla al crear documento"})
      const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        project_id:project.id,
        cantidad:cantidad,
        document_id:documentID,
        fecha:new Date(),
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
      const {project_id, cantidad}= req.body;
      const project=await getProjectById(project_id,prisma)
      const gestion= await getGestionByProjectId(project_id,prisma)
      const kycInfo= await getKycInfoByUser(USER.id,prisma)
      if(!project || !gestion || !project.precio_unitario || !project.cuenta_id || !kycInfo?.wallet || !project.cantidadRestante || !gestion.fecha_fin_venta) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      const fecha_abierto_por_usuario= await getFechaDeVentaInicial(kycInfo.wallet,project?.id,prisma)
      const cuenta= await getCuentaById(project.cuenta_id,prisma)
      if(!cuenta) return res.status(404).json({error:"Cuenta bancaria no encontrada"})
      if(project.cantidadRestante<cantidad) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const now= moment()
    console.log(fecha_abierto_por_usuario,gestion.fecha_fin_venta)
      if(!now.isBetween(moment(fecha_abierto_por_usuario),moment(gestion.fecha_fin_venta)) || project.estado!=="PUBLICO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
      await sendCompraTransferenciaEmail(USER.email,cuenta.numero,cuenta.banco,project.precio_unitario*cantidad,project.titulo,project.concepto_bancario? project.concepto_bancario :"Compra NFT")
        const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        cantidad:cantidad,
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

 