import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { sendAuthEmail, sendWelcomeEmail } from "../service/mail";
import { uploadImage } from "../service/aws";
import fetch from "node-fetch";

export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");


  export const createProject = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {nombre,cantidad,fecha_proximamente,
        fecha_publico,
        fecha_abierto,
        fecha_cerrado,
        fecha_en_proceso,
        fecha_reinversion,
        fecha_terminado, 
        precioUnitario,
        description,
        ubicacion,
        plazo_meses,
        costo_ejecucion_conservador, 
        beneficio_conservador,
        rentabilidad_conservador,
        costo_ejecucion_moderado, 
        beneficio_moderado, 
        rentabilidad_moderado,
        costo_ejecucion_favorable,
        beneficio_favorable,
        rentabilidad_favorable,
      numero,banco } = req.body;
     // @ts-ignore
    const USER= req.user as User;
    const cuenta=await prisma.cuentas.create({data:{
        numero,
        banco
    }})

      // // Utiliza fetch aquí dentro
      let img= await fetch("https://picsum.photos/200/300")
      const blob = await img.arrayBuffer()

    const project=await prisma.projects.create({data:{
        nombre,cantidad, precioUnitario,description,ubicacion, fecha_proximamente,
        fecha_publico,
        fecha_abierto,
        fecha_cerrado,
        fecha_en_proceso,
        fecha_reinversion,
        fecha_terminado,
        plazo_meses,
        costo_ejecucion_conservador,
        beneficio_conservador, 
        rentabilidad_conservador,
        costo_ejecucion_moderado, 
        beneficio_moderado, 
        rentabilidad_moderado,
        costo_ejecucion_favorable, 
        beneficio_favorable, 
        rentabilidad_favorable,
        cuenta_id:cuenta.id,
        estado:"NUEVO"
        }})
    const uniquePath=`${nombre}_${project.id}_${project.count_image? project.count_image+1 : 1}`
    await uploadImage(blob,uniquePath)
    const image=await prisma.projectImages.create({
      data:{
        project_id:project.id,
        path:uniquePath
      }
    })
    await prisma.projects.update({where:{id:project.id}, data:{count_image:project.count_image? project.count_image+1:1}})
    return res.status(200).json({ data:{project,image,cuenta} });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const updateProject = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
   
      return res.status(200).json({ data:'data' });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

