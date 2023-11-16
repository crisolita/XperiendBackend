import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getKycInfoByUser, getUserById } from "../service/user";
import { saleContract } from "../service/web3";
import {ethers} from 'ethers'
import { createCharge } from "../service/stripe";
import { crearPago } from "../service/pagos";
import { getGestion } from "../service/backoffice";
import { sendCompraTransferenciaEmailXREN, sendWelcomeClub } from "../service/mail";
import axios from "axios";
const APIKEYRATES="fca_live_cLgxgrhTJuHjvNc5DQSDiiC9ElM4qcrPs2TmZrq5"

export const compraXRENStripe = async (req: Request, res: Response) => {
  // @ts-ignore
  const prisma = req.prisma as PrismaClient;
  let pago;
    try {
           // @ts-ignore
    const USER= req.user as User;
    const {tokenAmount,cardNumber,exp_month,exp_year,cvc}= req.body;
    const user = await getUserById(USER.id, prisma)
    if(!user) return res.status(404).json({error:"User no econtrado"})
    const wallet= (await getKycInfoByUser(user.id,prisma))?.wallet
    if(!wallet) return res.status(404).json({error:"Wallet no econtrada"})
    const gestion= await getGestion(prisma)
    if(!gestion?.pagoTarjeta) return res.status(400).json({error:"No se permite pago con tarjeta"})
    const phase= await saleContract.functions.getcurrentPhase()
    let kyc= await getKycInfoByUser(USER.id, prisma)

    let amount=Number(ethers.utils.formatEther(phase[0].price))*100*tokenAmount
     let cambio=await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${APIKEYRATES}&base_currency=USD&currencies=EUR`)
    
     amount=amount*Number(cambio.data.data.EUR)
      if(amount<100)  return res.status(404).json({error:"Monto debe ser mayor"})

      // Cargo en stripe
        const charge= await createCharge(user.id,cardNumber,exp_month,exp_year,cvc,amount,prisma)
        if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
       pago = await crearPago(USER.id,Number(ethers.utils.formatEther(phase[0].price))*tokenAmount,"TARJETA_DE_CREDITO",new Date(),`Compra de ${tokenAmount} XREN`,prisma)
      const mint= await saleContract.functions.addUsersToVesting(ethers.utils.parseEther(tokenAmount.toString()),wallet)
      const order = await prisma.ordersXREN.create({
        data:{
          tipo:"COMPRA",
          user_id:USER.id,
          status:"PAGO_EXITOSO_ENTREGADO",
          amountEUR:amount/100,
          unidades:tokenAmount,
          hash:mint.hash,
          fecha:new Date()
        }
      })
      await sendWelcomeClub(user.email,`${kyc?.name} ${kyc?.lastname}`)      
      return res.status(200).json({pago,order});
    } catch ( error) {
      console.log(error)
      await prisma.pagos.delete({where:{id:pago?.id}})
      res.status(500).json( error );
    }
  };
  export const compraXRENTransferenciaBancaria = async (req: Request, res: Response) => {
    try {
     // @ts-ignore
     const prisma = req.prisma as PrismaClient;
     // @ts-ignore
const USER= req.user as User;
const {tokenAmount}= req.body;
const phase= await saleContract.functions.getcurrentPhase()

const gestion= await getGestion(prisma)
if(!gestion?.pagoTransferencia || !gestion.numero || !gestion.banco || !gestion.titular) return res.status(400).json({error:"No se permite pago con transferencia"})
let amount=Number(ethers.utils.formatEther(phase[0].price))*tokenAmount
let cambio=await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${APIKEYRATES}&base_currency=USD&currencies=EUR`)
    
amount=amount*Number(cambio.data.data.EUR)
 if(amount<100)  return res.status(404).json({error:"Monto debe ser mayor"})

///cambio
const order = await prisma.ordersXREN.create({
  data:{
    tipo:"COMPRA",
    user_id:USER.id,
    status:"PAGO_PENDIENTE",
    amountEUR:amount,
    unidades:tokenAmount,
    fecha:new Date()
  }
})
// de donde saco la cuenta?
const user= await getUserById(USER.id,prisma)
const kyc= await getKycInfoByUser(USER.id,prisma)
await sendCompraTransferenciaEmailXREN(USER.email,`${kyc?.name} ${kyc?.lastname}`,gestion.numero,gestion.banco,gestion.titular,`${gestion.concepto_bancario}_${order.id}_${USER.id}`,amount.toString())
return res.status(200).json(order);
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const compraXRENCripto = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
    const {tokenAmount,cripto,hash}= req.body;
    const user = await getUserById(USER.id, prisma)
    if(!user) return res.json({error:"Usuario no encontrado"})
        const phase= await saleContract.functions.getcurrentPhase()

          let amount=Number(ethers.utils.formatEther(phase[0].price))*tokenAmount
          let cambio=await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${APIKEYRATES}&base_currency=USD&currencies=EUR`)
  
          amount=amount*Number(cambio.data.data.EUR)
           if(amount<100)  return res.status(404).json({error:"Monto debe ser mayor"})
     
          const gestion= await getGestion(prisma)
          if(!gestion?.pagoCripto) return res.status(400).json({error:"No se permite pago con cripto"})
      const pago = await crearPago(USER.id,tokenAmount,cripto=="USDT"? "USDT":"BUSD",new Date(),`Compra de ${tokenAmount} XREN`,prisma)
      const order = await prisma.ordersXREN.create({
        data:{
          tipo:"COMPRA",
          user_id:USER.id,
          status:"PAGO_EXITOSO_ENTREGADO",
          unidades:tokenAmount,
          amountEUR:amount,
          hash:hash,
          fecha:new Date()
        }
      })
      await sendWelcomeClub(user.email,user.userName? user.userName:"querido usuario")      

      return res.status(200).json({pago,order});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const ordersXRENByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
    const orders= await prisma.ordersXREN.findMany({where:{user_id:USER.id}})
    res.json(orders)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const ordersXREN = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const orders= await prisma.ordersXREN.findMany()
      res.json(orders)
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };