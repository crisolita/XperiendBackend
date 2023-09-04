import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { deleteImageAWS, getImage, uploadImage } from "../service/aws";
import fetch from "node-fetch";
import { updateProyecto } from "../service/backoffice";

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

  export const getAllProjects= async(req:Request,res:Response) => {
    try {    // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const projects= await prisma.projects.findMany()
      return res.json({data:projects})
    } catch(e) {
      return res.status(500).json({error:e})
      }  
  }
  export const getImagesByProject= async(req:Request,res:Response) => {
    try {    // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {project_id}=req.query;
      let images:string[]=[]
      const paths= await prisma.projectImages.findMany({where: {project_id:Number(project_id)}})
        for(let i=0;i<paths.length;i++) {
          images.push(await getImage(paths[i].path))
        }
      return res.json({data:images})
    } catch(e) {

      console.log(e)
      return res.status(500).json({error:e})
      }  
  }
  export const deleteImage= async(req:Request,res:Response) => {
    try {    // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {path}=req.body;
      await prisma.projectImages.delete({where:{path:path}})
      await deleteImageAWS(path)
      return res.json({data:"Imagen eliminada con exito"})
    } catch(e) {

      console.log(e)
      return res.status(500).json({error:e})
      }  
  }
  export const addImage= async(req:Request,res:Response) => {
    try {    // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {project_id}=req.body;
      const project=await prisma.projects.findUnique({where:{id:project_id}})
      if(!project) return res.status(404).json({error:"NOT PROJECT FOUND"})
      const path=`${project.nombre}_${project_id}_${project.count_image? project.count_image+1 : 1}`

      await prisma.projectImages.create({data:{
        project_id:project_id,
        path:path
      }})
       // // Utiliza fetch aquí dentro
       let img= await fetch("https://picsum.photos/200/300")
       const blob = await img.arrayBuffer()
      
      await uploadImage(blob,path)
      await prisma.projects.update({
        where:{id:project_id},
        data:{
        count_image:project.count_image? project.count_image+1:1}
      })
      return res.json({data:"Imagen subida con exito"})
    } catch(e) {

      console.log(e)
      return res.status(500).json({error:e})
      }  
  }


  export const updateProject = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {id,nombre,cantidad,
        precioUnitario,
        estado,
        description,
        ubicacion,
        plazo_meses,
        fecha_proximamente,
        fecha_publico,
        fecha_abierto,
        fecha_cerrado,
        fecha_en_proceso,
        fecha_reinversion,
        fecha_terminado,
        costo_ejecucion_conservador,
        beneficio_conservador,
        rentabilidad_conservador,
        costo_ejecucion_moderado,
        beneficio_moderado,
        rentabilidad_moderado,
        costo_ejecucion_favorable,
        beneficio_favorable,
        rentabilidad_favorable,
        concepto_bancario,
        cuenta_id}= req.body;
        const updated=await updateProyecto(id,req.body,prisma)
      return res.status(200).json({ data:updated });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

