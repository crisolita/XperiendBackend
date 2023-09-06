import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { deleteImageAWS, getImage, uploadImage } from "../service/aws";
import fetch from "node-fetch";
import { getProjectById } from "../service/backoffice";
import moment from "moment";
import { createCharge } from "../service/stripe";
import { getGestionByPorjectId } from "../service/participaciones";
import { crearPago } from "../service/pagos";
export const compraParticipacionStripe = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
           // @ts-ignore
    const USER= req.user as User;
      const {project_id,cardNumber,exp_month,exp_year,cvc}= req.body;
      const project=await getProjectById(project_id,prisma)
      const gestion= await getGestionByPorjectId(project_id,prisma)
      if(!project || !gestion || !project.precio_unitario) return res.status(404).json({error:"Proyecto no encontrado o sin fechas asignadas"})
      if(project.cantidadRestante==0) return res.status(400).json({error:"No hay suficientes participaciones a comprar"})
      const now= moment()
      if(!now.isBetween(moment(gestion.fecha_abierto),moment(gestion.fecha_en_proceso)) || project.estado!=="ABIERTO") return res.status(400).json({error:"No esta en la etapa de compra a Xperiend"})
      
        /// Cargo en stripe
        const charge= await createCharge(USER.id,cardNumber,exp_month,exp_year,cvc,(project.precio_unitario*100).toString(),prisma)
        if(!charge) return res.status(400).json({error:"Cargo tarjeta de credito ha fallado"})
      
        ///Minteo de NFT

      const pago = await crearPago(USER.id,project.precio_unitario,"TARJETA_DE_CREDITO",new Date(),"Compra de participacion",prisma)
      const order= await prisma.orders.create({
        data:{
        tipo:"COMPRA",
        user_id:USER.id,
        project_id:project.id,
        status:"PAGADO_Y_ENTREGADO"
        }
    })

      return res.status(200).json({ data:{pago,order} });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };