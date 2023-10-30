import { PrismaClient, User } from "@prisma/client";
import { Request, Response, response } from "express";
import { getProjectById } from "../service/backoffice";
import moment from "moment";
import { createCharge } from "../service/stripe";
import { getCuentaById,  getFechaDeVentaInicial,  getGestionByProjectId, getOrderById, getTotalBalanceStake, getTotalBalanceVenta, updateOrder } from "../service/participaciones";
import { crearPago } from "../service/pagos";
import { sendCompraTransferenciaEmail } from "../service/mail";
import {  crearDocumentoDeCompra, crearDocumentoDeIntercambio, crearDocumentoReclamacion, crearDocumentoReinversion, isCompleted } from "../service/pandadoc";
import { getKycInfoByUser } from "../service/user";
import fetch from "node-fetch";
import { xperiendNFT } from "../service/web3";
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
      if(!project || !gestion || !project.precio_unitario || !kycInfo?.wallet || !project.cantidadRestante || !gestion.fecha_fin_venta || !project.pagoTarjeta) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      if(project.cantidadRestante<cantidad) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const fecha_abierto_por_usuario= await getFechaDeVentaInicial(kycInfo.wallet,project?.id,prisma)
      const now= moment()

      if(!now.isBetween(moment(fecha_abierto_por_usuario),moment(gestion.fecha_fin_venta)) || project.estado!=="ABIERTO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
        /// Cargo en stripe
        const charge= await createCharge(USER.id,cardNumber,exp_month,exp_year,cvc,project.precio_unitario*100*cantidad.toString(),prisma)
        if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
      const pago = await crearPago(USER.id,project.precio_unitario*cantidad,"TARJETA_DE_CREDITO",new Date(),"Compra de participacion",prisma)
     
      const docData= await crearDocumentoDeCompra(USER.id,project.id,template_id.id,prisma)
      if(!docData) return res.status(500).json({error:"Falla al crear documento"})
      const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        project_id:project.id,
        cantidad:cantidad,
        document_id:docData.id,
        url_sign:docData.link,
        fecha:new Date(),
        status:"POR_FIRMAR"
        }
    })
      return res.status(200).json({pago,order} );
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
      if(!project || !gestion || !project.precio_unitario || !project.cuenta_id || !kycInfo?.wallet || !project.cantidadRestante || !gestion.fecha_fin_venta || !project.pagoTransferencia) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      const fecha_abierto_por_usuario= await getFechaDeVentaInicial(kycInfo.wallet,project?.id,prisma)
      const cuenta= await getCuentaById(project.cuenta_id,prisma)
      if(!cuenta) return res.status(404).json({error:"Cuenta bancaria no encontrada"})
      if(project.cantidadRestante<cantidad) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const now= moment()
    console.log(fecha_abierto_por_usuario,gestion.fecha_fin_venta)
      if(!now.isBetween(moment(fecha_abierto_por_usuario),moment(gestion.fecha_fin_venta)) || project.estado!=="ABIERTO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
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

      return res.status(200).json({order,concepto:project.concepto_bancario,numero:cuenta.numero,banco:cuenta.banco} );
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const prueba = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    // const USER= req.user as User;
      const hola= await crearDocumentoDeCompra(1,1,"eWwha59cftFdfQVecqg825",prisma)
    res.json("prueba")
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const signedDocument = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
    const {document_id}= req.body
    let newOrder;
    const order= await prisma.orders.findFirst({where:{document_id,user_id:USER.id}})
    if(!order) return res.status(404).json({error:"Orden no encontrada"})
    
    const signed= await isCompleted(document_id)
    if(!signed) return res.json({data:{document_signed:signed,order}})
    newOrder= await updateOrder(order.id,{status:"FIRMADO_POR_ENTREGAR"},prisma)

    switch(order.tipo) {
      case 'COMPRA':
        ///MINTEAR UN NFT?
        break
      case 'RECLAMACION':
        break
      case 'RECOMPRA':
        break
      case 'REINVERSION':
        break
        case 'INTERCAMBIO':
          break
    }  

    res.json("prueba")
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const createIntercambio = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    const USER= req.user as User;
    const {nftId}= req.body;
    const exchange= await xperiendNFT.getExchange(nftId)
    const kycInfo= await getKycInfoByUser(USER.id,prisma)
    if(exchange.giver!==kycInfo?.wallet) return res.status(403).json({error:"Wallet no coincide"})
    const project= await getProjectById(exchange.projectId.toString(),prisma)
  if(!project || project.estado!="EN_PROCESO" || exchange.status!=1) return res.status(400).json({error:"Proyecto no encontrado o terminado"})
    const gestion= await getGestionByProjectId(project.id,prisma)
    const now= moment()
    if(!now.isBetween(moment(gestion?.fecha_inicio_intercambio),moment(gestion?.fecha_fin_intercambio)) ) return res.status(400).json({error:"No esta en la etapa de intercambio"})


    const order= await prisma.orders.create({data:{
      tipo:"INTERCAMBIO",
      user_id:USER.id,
      project_id:exchange.project_id,
      status:"POR_FIRMAR",
      cantidad:1,
      nft_id:nftId,
    }})
    res.json(order)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const acceptIntercambioStripe = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    const USER= req.user as User;
    const {orderId,cvc,exp_month,exp_year,cardNumber}= req.body;
    const order= await getOrderById(orderId,prisma)
    if(!order) return res.status(404).json({error:"Orden no encotrada"})
    const exchange= await xperiendNFT.getExchange(order.nft_id)
    const project= await getProjectById(exchange.projectId.toString(),prisma)
    if(!project || project.estado!="EN_PROCESO" || exchange.status!=1 || order.status!="POR_INTERCAMBIAR" || !project.precio_unitario) return res.status(400).json({error:"Proyecto no encontrado o terminado"})
    const gestion= await getGestionByProjectId(project.id,prisma)
    const now= moment()
    if(!now.isBetween(moment(gestion?.fecha_inicio_intercambio),moment(gestion?.fecha_fin_intercambio)) ) return res.status(400).json({error:"No esta en la etapa de intercambio"})

      /// Cargo en stripe
      const charge= await createCharge(USER.id,cardNumber,exp_month,exp_year,cvc,project.precio_unitario*100,prisma)
      if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
    
    const pago = await crearPago(USER.id,project.precio_unitario,"TARJETA_DE_CREDITO",new Date(),"Compra de participacion a traves de intercambio",prisma)
   
      /// Generar o buscar el documento y enviarselo al nuevo usuario para que lo firme
      const template= await prisma.templates.findFirst({where:{project_id:project.id,document_type:"INTERCAMBIO"}})
      if(!template) return res.status(404).json({error:"Template no encotrado"})
  
      const doc= await crearDocumentoDeIntercambio(order.user_id,USER.id,project.id,template.id,prisma)
      const newOrder= await updateOrder(order.id,{status:"POR_FIRMAR",url_sign:doc?.link,document_id:doc?.id},prisma)
    res.json(newOrder)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const acceptIntercambioTransferencia = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    const USER= req.user as User;
    const {orderId}= req.body;
    const order= await getOrderById(orderId,prisma)
    if(!order) return res.status(404).json({error:"Orden no encotrada"})
    const exchange= await xperiendNFT.getExchange(order.nft_id)
    const project= await getProjectById(exchange.projectId.toString(),prisma)
    if(!project || project.estado!="EN_PROCESO" || exchange.status!=1 || order.status!="POR_INTERCAMBIAR" || !project.cuenta_id || !project.precio_unitario) return res.status(400).json({error:"Proyecto no encontrado o terminado"})
    const cuenta= await getCuentaById(project.cuenta_id,prisma)
    const gestion= await getGestionByProjectId(project.id,prisma)
    const now= moment()
    if(!cuenta) return res.status(404).json({error:"Cuenta para transferir no definida"})
    if(!now.isBetween(moment(gestion?.fecha_inicio_intercambio),moment(gestion?.fecha_fin_intercambio)) ) return res.status(400).json({error:"No esta en la etapa de intercambio"})
    await sendCompraTransferenciaEmail(USER.email,cuenta.numero,cuenta.banco,project.precio_unitario,project.titulo,project.concepto_bancario? project.concepto_bancario :"Compra NFT por intercambio")

    const newOrder= await updateOrder(order.id,{status:"PAGO_PENDIENTE",exchange_receiver:USER.id},prisma)
    res.json(newOrder)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const crearReclamar = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    const USER= req.user as User;
    const {nftId}= req.body;
    const claim= await xperiendNFT.getClaim(nftId)
    const nft= await prisma.nFT.findUnique({where:{id:nftId}})
    if(!nft) return res.status(404).json({error:"NFT no encontrado"})
    const project= await getProjectById(nft?.project_id,prisma)
    if(!project || project.estado!="EN_PROCESO" || claim.status!=1) return res.status(404).json({error:"Proyecto no encontrado o terminado"})
    const gestion= await getGestionByProjectId(project.id,prisma)
    const now= moment()

    if(!now.isAfter(moment(gestion?.fecha_reclamo)) ) return res.status(400).json({error:"No esta en la etapa de intercambio"})
    const template= await prisma.templates.findFirst({where:{project_id:project.id,document_type:"RECLAMACION"}})
    if(!template) return res.status(404).json({error:"Template no encotrado"})

    const doc= await crearDocumentoReclamacion(USER.id,project.id,template.id,prisma)

    const order= await prisma.orders.create({data:{
      tipo:"RECLAMACION",
      user_id:USER.id,
      project_id:project.id,
      document_id:doc?.id,
      url_sign:doc?.link,
      status:"PAGO_PENDIENTE",
      cantidad:1,
      nft_id:nftId,
    }})
    res.json(order)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const crearReinversion = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    //        // @ts-ignore
    const USER= req.user as User;
    const {nftId}= req.body;
    const reinvest= await xperiendNFT.getReinvest(nftId)
    const nft= await prisma.nFT.findUnique({where:{id:nftId}})
    if(!nft) return res.status(404).json({error:"NFT no encontrado"})
    const project= await getProjectById(nft?.project_id,prisma)
    if(!project || project.estado!="EN_PROCESO" || reinvest.status!=1) return res.status(404).json({error:"Proyecto no encontrado o terminado"})
    const gestion= await getGestionByProjectId(project.id,prisma)
    const now= moment()

    if(!now.isBetween(moment(gestion?.fecha_inicio_reinversion),moment(gestion?.fecha_fin_reinversion)) ) return res.status(400).json({error:"No esta en la etapa de intercambio"})

    const template= await prisma.templates.findFirst({where:{project_id:project.id,document_type:"REINVERSION"}})
    if(!template) return res.status(404).json({error:"Template no encotrado"})

    const doc= await crearDocumentoReinversion(USER.id,project.id,template.id,prisma)
    const order= await prisma.orders.create({data:{
      tipo:"REINVERSION",
      user_id:USER.id,
      project_id:project.id,
      status:"PAGO_PENDIENTE",
      document_id:doc?.id,
      url_sign:doc?.link,
      cantidad:1,
      nft_id:nftId,
    }})
    res.json(order)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const ordersByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
    const orders= await prisma.orders.findMany({where:{user_id:USER.id}})
    res.json(orders)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const orders = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const orders= await prisma.orders.findMany()
      res.json(orders)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const allPagos = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    
      const pagos= await prisma.pagos.findMany()
      res.json(pagos)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const pagosByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
            // @ts-ignore
    const USER= req.user as User;
      const pagos= await prisma.pagos.findMany({where:{user_id:USER.id}})
      res.json(pagos)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };


