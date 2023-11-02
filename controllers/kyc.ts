import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getKycInfoByUser, getUserById, updateKyc, updateUser } from "../service/user";
import { uploadImage } from "../service/aws";



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
     await updateUser(USER.id,{kycStatus:"PENDIENTE"},prisma)
    
     let base64Frontal,pathFrontal,pathTrasera,base64Trasera
     if(document=="DNI" && foto_dni_frontal && foto_dni_trasera) {
       pathFrontal=`kyc_image_${user.id}_${info.id}_${"DNIFRONTAL"}`
       pathTrasera=`kyc_image_${user.id}_${info.id}_${"DNITRASERA"}`

       base64Frontal= foto_dni_frontal.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
       base64Trasera= foto_dni_trasera.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
       let data= Buffer.from(base64Frontal,'base64')
       await uploadImage(data,pathFrontal)
       let img= await prisma.kycImages.create({
       data:{
         info_id:info.id,
         path:pathFrontal,
         rol:"DNIFRONTAL"
       }
     })
     dataImages.push(img)
      data= Buffer.from(base64Trasera,'base64')
     await uploadImage(data,pathTrasera)
      img= await prisma.kycImages.create({
     data:{
       info_id:info.id,
       path:pathTrasera,
       rol:"DNITRASERA"
     }
   })
   dataImages.push(img)
     } else if (document=="PASSPORT" && foto_dni_frontal) {
      pathFrontal=`kyc_image_${user.id}_${info.id}_${"DNIFRONTAL"}`

      base64Frontal= foto_dni_frontal.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
      let data= Buffer.from(base64Frontal,'base64')
      await uploadImage(data,pathFrontal)
      let img= await prisma.kycImages.create({
      data:{
        info_id:info.id,
        path:pathFrontal,
        rol:"DNIFRONTAL"
      }
    })
    dataImages.push(img)
     } else {
      return res.status(400).json({error:"No hay suficientes fotos de los documentos"})
     }

     return res.json({info,dataImages})
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
     const {name,lastname,country_born,birth,telf,address,document_number,document,city,postalCode,state,country,foto_dni_frontal,foto_dni_trasera,wallet }= req.body;
     const user= await getUserById(USER.id,prisma)
     const kycAlready= await getKycInfoByUser(USER.id,prisma)
     let info;
     if(!user) return res.status(404).json({error: "User no encontrado"})
     if(kycAlready?.status=="APROBADO" || kycAlready?.status=="PENDIENTE") { 
      return res.status(400).json({error:"Kyc aprobado o pendiente"})
    } else if(!kycAlready) {
      return res.status(400).json({error:"Kyc no creado"})
     } else if(kycAlready?.status=="RECHAZADO") {
  
    info=await updateKyc(kycAlready.id,{name,lastname,document_number,country_born,birth,telf,address,document,city,postalCode,state,country,wallet,status:"PENDIENTE"},prisma)
    await updateUser(USER.id,{kycStatus:"PENDIENTE"},prisma)     
    if(foto_dni_frontal) {
            const path=`kyc_image_${user.id}_${info.id}_DNIFRONTAL`
            const data= Buffer.from(foto_dni_trasera.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64')
            await uploadImage(data,path)
          }
          if(foto_dni_trasera) {
            const path=`kyc_image_${user.id}_${info.id}_DNITRASERA`
            const data= Buffer.from(foto_dni_trasera.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64')
            await uploadImage(data,path)
          }
          return res.json(info)
     }
     
  
  } catch (e) {
    console.log(e)
    res.status(500).json({error:e})
  }
  }




