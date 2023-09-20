import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getKycInfoByUser, getUserById, updateKyc, updateUser } from "../service/user";
import { uploadImage } from "../service/aws";
import fetch from "node-fetch";
const stripe = require('stripe')(process.env.SK_TEST);
const endpointSecret=process.env.WEBHOOKSECRET_TEST;



export const submitKYC= async (req:Request,res: Response) => {
try {
   // @ts-ignore
   const prisma = req.prisma as PrismaClient;
   // @ts-ignore
   const USER = req.user as User;
   const {name,lastname,country_born,birth,telf,address,document,document_number,city,postalCode,state,country,foto_dni_frontal,foto_dni_trasera,wallet }= req.body;
   const user= await getUserById(USER.id,prisma)
   const kycAlready= await getKycInfoByUser(USER.id,prisma)
   let info,dataImages=[];
   if(!user) return res.status(404).json({error: "User no encontrado"})
   if(kycAlready?.status=="APROBADO" || kycAlready?.status=="PENDIENTE") { 
    return res.status(400).json({error:"Kyc aprobado o pendiente"})
  } else if(kycAlready?.status=="RECHAZADO") {
    return res.status(400).json({error:"Kyc Rechazado, actualizar datos"})
   } else if(!kycAlready) {
      info= await prisma.kycInfo.create({
      data:{
        user_id:user.id,
        name,
        lastname,
        country_born,
        birth:new Date(birth),
        telf,
        document,
        document_number,
        address,
        city,
        postalCode,
        state,
        country,
        wallet,
        status:"PENDIENTE"
      }
     })

     const images=[foto_dni_frontal.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),foto_dni_trasera.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')]
    
      const buffer= Buffer.from(images[0],'base64')
     // hacer loop para subirlas a ipfs y guardar la data 
     for (let i=0;i<images.length;i++) {
      const path=`kyc_image_${user.id}_${info.id}_${i==0?"DNIFRONTAL":"DNITRASERA"}`
          // // Utiliza fetch aquí dentro
        const data= Buffer.from(images[i],'base64')
          await uploadImage(data,path)
          const img= await prisma.kycImages.create({
          data:{
            info_id:info.id,
            path:path,
            rol:i==0? "DNIFRONTAL" : "DNITRASERA"
          }
        })
        dataImages.push(img)
     }

     return res.json({data:{info,dataImages}})
   }
   

} catch (e) {
  console.log(e)
  res.status(500).json({error:e})
}
}
export const updateKYC= async (req:Request,res: Response) => {
  try {
     // @ts-ignore
     const prisma = req.prisma as PrismaClient;
     // @ts-ignore
     const USER = req.user as User;
     const {name,lastname,country_born,birth,telf,address,document,city,postalCode,state,country,foto_dni_frontal,foto_dni_trasera,wallet }= req.body;
     const user= await getUserById(USER.id,prisma)
     const kycAlready= await getKycInfoByUser(USER.id,prisma)
     let info;
     if(!user) return res.status(404).json({error: "User no encontrado"})
     if(kycAlready?.status=="APROBADO" || kycAlready?.status=="PENDIENTE") { 
      return res.status(400).json({error:"Kyc aprobado o pendiente"})
    } else if(!kycAlready) {
      return res.status(400).json({error:"Kyc no creado"})
     } else if(kycAlready?.status=="RECHAZADO") {
  
    info=await updateKyc(kycAlready.id,{name,lastname,country_born,birth,telf,address,document,city,postalCode,state,country,wallet},prisma)
          if(foto_dni_frontal) {
            const path=`kyc_image_${user.id}_${info.id}_DNIFRONTAL`
            const blob = await foto_dni_frontal.arrayBuffer()
            await uploadImage(blob,path)
          }
          if(foto_dni_trasera) {
            const path=`kyc_image_${user.id}_${info.id}_DNITRASERA`
            const blob = await foto_dni_trasera.arrayBuffer()
            await uploadImage(blob,path)
          }
          return res.json({data:{info}})
     }
     
  
  } catch (e) {
    console.log(e)
    res.status(500).json({error:e})
  }
  }




