import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getKycInfoByUser, getUserById } from "../service/user";
import { saleContract, validateTx } from "../service/web3";
import {ethers} from 'ethers'
import { createCharge } from "../service/stripe";
import { crearPago } from "../service/pagos";
import { sendCompraTransferenciaEmail, sendThanksBuyEmail } from "../service/mail";

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
    const phase= await saleContract.functions.getcurrentPhase()
  

    const amount=Number(ethers.utils.formatEther(phase[0].price))*100*tokenAmount

    if(amount<100)  return res.status(404).json({error:"Monto debe ser mayor"})

      // Cargo en stripe
        const charge= await createCharge(user.id,cardNumber,exp_month,exp_year,cvc,amount,prisma)
        if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
       pago = await crearPago(USER.id,Number(ethers.utils.formatEther(phase[0].price))*tokenAmount,"TARJETA_DE_CREDITO",new Date(),`Compra de ${amount} XREN`,prisma)
      const mint= await saleContract.functions.addUsersToVesting(ethers.utils.parseEther(tokenAmount.toString()),wallet)
      const order = await prisma.ordersXREN.create({
        data:{
          tipo:"COMPRA",
          user_id:USER.id,
          status:"PAGO_EXITOSO_ENTREGADO",
          amountUSD:amount/100,
          unidades:tokenAmount,
          hash:mint.hash,
          fecha:new Date()
        }
      })
      await sendThanksBuyEmail(user.email,tokenAmount,"TARJETA DE CREDITO")
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
const cuenta= await prisma.cuentas.findFirst({where:{xrenAccount:true}})
if(!cuenta) return res.status(404).json({error:"No hay cuenta asignada a la compra XREN"})
const phase= await saleContract.functions.getcurrentPhase()

const amount=Number(ethers.utils.formatEther(phase[0].price))*tokenAmount
const order = await prisma.ordersXREN.create({
  data:{
    tipo:"COMPRA",
    user_id:USER.id,
    status:"PAGO_PENDIENTE",
    amountUSD:amount,
    unidades:tokenAmount,
    fecha:new Date()
  }
})
// de donde saco la cuenta?
await sendCompraTransferenciaEmail(USER.email,cuenta.numero,cuenta.banco,tokenAmount,"Compra XREN","Compra XREN")
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
    //        // @ts-ignore
    // const USER= req.user as User;
    // //validar que cripto solo pueda ser USDT o BUSD
    const {tokenAmount,cripto,hash}= req.body;
    // const user = await getUserById(USER.id, prisma)
    // if(!user) return res.json({error:"Usuario no encontrado"})
    // const phase= await saleContract.functions.getcurrentPhase()
    
    /// revisar el hash y validar la transaccion ?
      await validateTx(hash,prisma)
    // const amount=Number(ethers.utils.formatEther(phase[0].price))*tokenAmount
      
    //   const pago = await crearPago(USER.id,amount,cripto=="USDT"? "USDT":"BUSD",new Date(),`Compra de ${amount} XREN`,prisma)
    //   const order = await prisma.ordersXREN.create({
    //     data:{
    //       tipo:"COMPRA",
    //       user_id:USER.id,
    //       status:"PAGO_EXITOSO_ENTREGADO",
    //       amount:amount,
    //       hash:hash,
    //       fecha:new Date()
    //     }
    //   })
    //   await sendThanksBuyEmail(user.email,tokenAmount,`${cripto}`)
    //   return res.status(200).json({ data:{pago,order} });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };