import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { deleteImageAWS, getImage, uploadImage } from "../service/aws";
import fetch from "node-fetch";
import { getProjectById, updateEscenario, updateFechas, updateProject } from "../service/backoffice";
import moment from "moment";

export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");


  export const createProject = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {
      titulo,
      ubicacion,
      definicion, 
      resumen
     } = req.body;
     // @ts-ignore
    const USER= req.user as User;

    const project=await prisma.projects.create({data:{
        titulo,
        ubicacion,
        definicion,
        resumen,
        estado:"NUEVO"
        }})
    
 
    return res.status(200).json({ data:{project} });
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



  /// Actualizacion del proyecto
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
      const {project_id,rol}=req.body;
      const project=await prisma.projects.findUnique({where:{id:project_id}})
      if(!project) return res.status(404).json({error:"NOT PROJECT FOUND"})
      const path=`${project.titulo}_${project_id}_${project.count_image? project.count_image+1 : 1}`

      await prisma.projectImages.create({data:{
        project_id:project_id,
        path:path,
        rol:rol
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
  export const updateProjectEscenario = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        escenario,   
        aporte_inversores, 
        beneficio, 
        rentabilidad,  
        coste_activo,  
        costo_construccion,
        gestion_xperiend,
        coste_desarrollo,
        coste_promocion,
        recursion
      }= req.body;
      let escenarioEconomico;
        const exist= await prisma.escenario_economico.findFirst({where:{project_id:project_id,escenario:escenario}})
        if(exist) {
         escenarioEconomico=await updateEscenario(exist.id,req.body,prisma)
        } else {
          escenarioEconomico= await prisma.escenario_economico.create({
            data:{
              project_id,
              escenario,   
              aporte_inversores, 
              beneficio, 
              rentabilidad,  
              coste_activo,  
              costo_construccion,
              gestion_xperiend,
              coste_desarrollo,
              coste_promocion,
              recursion
            }
          })
        }

      return res.status(200).json({ data: escenarioEconomico});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectFechas = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        fecha_proximamente,
        fecha_publico,
        fecha_abierto,
        fecha_cerrado,
        fecha_en_proceso,
        fecha_reinversion,
        fecha_terminado
      }= req.body;
      let fechas;
        const exist= await prisma.gestion_fechas.findUnique({where:{project_id:project_id}})
        if(exist) {
         fechas=await updateFechas(project_id,req.body,prisma)
        } else {
          fechas= await prisma.gestion_fechas.create({
            data:{
              project_id,
              fecha_proximamente,
              fecha_publico,
              fecha_abierto,
              fecha_cerrado,
              fecha_en_proceso,
              fecha_reinversion,
              fecha_terminado
            }
          })
        }

      return res.status(200).json({ data: fechas});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectCuenta = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        numero,
        banco
      }= req.body;
      let cuenta;
        const exist= await prisma.cuentas.findMany({where:{numero:numero,banco:banco}})
        if(exist) {
         cuenta=await updateProject(project_id,{cuenta_id:exist[0].id},prisma)
        } else {
           const newCuenta=await prisma.cuentas.create({
            data:{
              numero,
              banco
            }
          })
          cuenta=await updateProject(project_id,{cuenta_id:newCuenta.id},prisma)
        }

      return res.status(200).json({ data: cuenta});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectCantidadYPrecio = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        cantidad,
        precio_unitario,
        beneficioPorNFT,
        proyectoReinversion
      }= req.body;
      let newProject;
      const project= await getProjectById(project_id,prisma)
      if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
      newProject= await updateProject(project_id,{cantidadInicial:cantidad,cantidadRestante:cantidad,
        precio_unitario,
        beneficioPorNFT,
        proyectoReinversion},prisma)
       
      return res.status(200).json({ data: newProject});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectPlazoYBeneficio = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        rentabilidad_estimada,
        beneficio_estimado,
        plazo_ejecucion,
        ejecucion_proyecto
      }= req.body;
        const project= await getProjectById(project_id,prisma)
        if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
        const updated= await updateProject(project_id,{rentabilidad_estimada,
          beneficio_estimado,
          plazo_ejecucion,
          ejecucion_proyecto},prisma)

      return res.status(200).json({ data: updated});
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectEstado = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
       estado
      }= req.body;
      const project= await getProjectById(project_id,prisma)
      let nuevoEstado;
      if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
      switch (project.estado) {
          case "NUEVO":
            if(estado!=="PROXIMAMENTE") return res.status(400).json({error:"Estado incorrecto"})
            nuevoEstado= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "PROXIMAMENTE":
            if(estado!=="PUBLICO") return res.status(400).json({error:"Estado incorrecto"})
            nuevoEstado= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "PUBLICO":
            if(estado!=="ABIERTO") return res.status(400).json({error:"Estado incorrecto"})
            nuevoEstado= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "ABIERTO":
            if(estado!=="EN_PROCESO" || estado!=="CERRADO") return res.status(400).json({error:"Estado incorrecto"})
            nuevoEstado= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "EN_PROCESO":
            if(estado!=="TERMINADO") return res.status(400).json({error:"Estado incorrecto"})
            nuevoEstado= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break
          case "CERRADO":
          return res.status(400).json({error:"Estado cerrado"})
          case "TERMINADO":
          return res.status(400).json({error:"Estado terminado"})
      }
      return res.status(200).json({ data:nuevoEstado });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };


//gestion user venta 
export const manageSaleUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {
      project_id,
      tipoDeUser,
      openingDate,
      minXRENwallet,
      minXRENstake
    }= req.body;
    const project= await getProjectById(project_id,prisma)
    let updated;
    if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
    const exist = await prisma.userManage.findFirst({where:{project_id:project.id,tipoDeUser:tipoDeUser}})
  if(exist) {
     updated = await prisma.userManage.update({where:{id:exist.id},data:{openingDate:openingDate,minXRENstake:minXRENstake,minXRENwallet:minXRENwallet}})
  } else  {
    updated = await prisma.userManage.create({data:{project_id:project_id,tipoDeUser:tipoDeUser,openingDate:openingDate,minXRENstake:minXRENstake,minXRENwallet:minXRENwallet}})
  }
    return res.status(200).json({ data:updated });
  } catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};
  



