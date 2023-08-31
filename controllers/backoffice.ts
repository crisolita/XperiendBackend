import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { sendAuthEmail, sendWelcomeEmail } from "../service/mail";



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
        images,numero,banco } = req.body;
     // @ts-ignore
    const USER= req.user as User;
    const cuenta=await prisma.cuentas.create({data:{
        numero,
        banco,

    }})
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
        creator_id:USER.id,
        estado:"NUEVO"
    }})
    return res.status(200).json({ data:project });
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
