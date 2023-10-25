import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { deleteImageAWS, getImage, uploadDoc, uploadImage } from "../service/aws";
import { getProjectById, updateEscenario, updateFechas, updateProject } from "../service/backoffice";
import moment from "moment";
import {  getOrderById, updateOrder } from "../service/participaciones";
import { crearPago } from "../service/pagos";
import { crearDocumentoDeCompra, crearDocumentoDeIntercambio, getTemplates, isValidTemplate } from "../service/pandadoc";
import { getAllUsers, getKycInfoByUser, getUserById, updateKyc, updateUser } from "../service/user";
import { ethers } from "ethers";
import { saleContract, xperiendNFT } from "../service/web3";
import { sendPagoCancelado, sendPagoDevuelto, sendThanksBuyEmail } from "../service/mail";

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
    // const USER= req.user as User;

    const data=await prisma.projects.create({data:{
        titulo,
        ubicacion,
        definicion,
        resumen,
        estado:"NUEVO"
        }})
    
 
    return res.status(200).json(data);
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };



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
      const {project_id,images}=req.body;
      const project=await prisma.projects.findUnique({where:{id:project_id}})
      if(!project) return res.status(404).json({error:"NOT PROJECT FOUND"})

      for (let image of images) {
        const path=`${project.titulo.replace(/\s/g, '_')}_${project_id}_${project.count_image? project.count_image+1 : 1}`
        const exist = await prisma.projectImages.findUnique({where:{path}})
        if(!exist) {
          await prisma.projectImages.create({data:{
            project_id:project_id,
            path:path,
            rol:image.rol
          }})
        }
         // // Utiliza fetch aquí dentro
         const data= Buffer.from(image.base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64')
  
         await uploadImage(data,path)
        await prisma.projects.update({
          where:{id:project_id},
          data:{
          count_image:project.count_image? project.count_image+1:1}
        })


      }
      return res.json({data:"Imagenes subidas con exito"})
    } catch(e) {

      console.log(e)
      return res.status(500).json({error:e})
      }  
  }

  ///Subir documentos asociados a proyectos
  export const addDoc= async(req:Request,res:Response) => {
    try {    // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {project_id,docs}=req.body;
      const project=await prisma.projects.findUnique({where:{id:project_id}})
      if(!project) return res.status(404).json({error:"NOT PROJECT FOUND"})
      for (let doc of docs) {
    const path=`${project.titulo.replace(/\s/g, '_')}_${project_id}_${doc.rol}`
    const exist= await prisma.projectDocs.findUnique({where:{path}})
    if(!exist) {
      await prisma.projectDocs.create({data:{
        project_id:project_id,
        path:path,
        visible:false,
        rol:doc.rol
      }})
    }
     // // Utiliza fetch aquí dentro
     const data= Buffer.from(doc.base64.replace(/^data:doc\/(pdf);base64,/, ''),'base64')

     await uploadDoc(data,path)
    }
   
      return res.json({data:"Documento subido con exito"})
    } catch(e) {

      console.log(e)
      return res.status(500).json({error:e})
      }  
  }
  /// gestion proyecto 
  
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
      let data;
        const exist= await prisma.escenario_economico.findFirst({where:{project_id:project_id,escenario:escenario}})
        if(exist) {
         data=await updateEscenario(exist.id,req.body,prisma)
        } else {
          data= await prisma.escenario_economico.create({
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

      return res.status(200).json(data);
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
        fecha_inicio_reinversion,
        fecha_fin_reinversion,
        fecha_reclamo,
        fecha_fin_venta,
        fecha_inicio_intercambio,
        fecha_fin_intercambio,
        visible_user,
        visible_premium,
        visible_gold
      }= req.body;
      let data;
      
        const exist= await prisma.gestion_fechas.findUnique({where:{project_id:project_id}})
        if(exist) {
         data=await updateFechas(project_id,{ fecha_inicio_reinversion:fecha_inicio_reinversion? new Date(fecha_inicio_reinversion): null,
          fecha_fin_reinversion:fecha_fin_reinversion? new Date(fecha_fin_reinversion): null,
        fecha_reclamo:fecha_reclamo? new Date(fecha_reclamo): null,
        fecha_inicio_intercambio:fecha_inicio_intercambio? new Date(fecha_inicio_intercambio): null,
        fecha_fin_intercambio:fecha_fin_intercambio? new Date(fecha_fin_intercambio): null,
        fecha_fin_venta:fecha_fin_venta? new Date(fecha_fin_venta): null,
        visible_user,
        visible_premium,
        visible_gold},prisma)
        } else {
          data= await prisma.gestion_fechas.create({
            data:{
              project_id,
              fecha_fin_venta:fecha_fin_venta? new Date(fecha_fin_venta): null,
            fecha_inicio_reinversion:fecha_inicio_reinversion? new Date(fecha_inicio_reinversion): null,
          fecha_fin_reinversion:fecha_fin_reinversion? new Date(fecha_fin_reinversion): null,
        fecha_reclamo:fecha_reclamo? new Date(fecha_reclamo): null,
        fecha_inicio_intercambio:fecha_inicio_intercambio? new Date(fecha_inicio_intercambio): null,
        fecha_fin_intercambio:fecha_fin_intercambio? new Date(fecha_fin_intercambio): null,
        visible_user,
        visible_premium,
        visible_gold
            }
          })
        }

      return res.status(200).json(data);
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
        banco,concepto_bancario
      }= req.body;
      let data;
        const exist= await prisma.cuentas.findFirst({where:{numero:numero,banco:banco}})
        if(exist) {
         data=await updateProject(project_id,{cuenta_id:exist.id,concepto_bancario},prisma)
        } else {
           const newCuenta=await prisma.cuentas.create({
            data:{
              numero,
              banco
            }
          })
          data=await updateProject(project_id,{cuenta_id:newCuenta.id,concepto_bancario},prisma)
        }

      return res.status(200).json(data);
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };

  export const updateProjectController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
        project_id,
        titulo,
        ubicacion,
        definicion, 
        resumen,
        rentabilidad_estimada,
        beneficio_estimado,
        plazo_ejecucion,
        ejecucion_proyecto,
        cantidad,
        precio_unitario,
        beneficioPorNFT,
        proyectoReinversion,
        description,
        recuperar_dinero_info,
        pagoTransferencia,
        pagoTarjeta,
        pagoCripto
      }= req.body;
        const project= await getProjectById(project_id,prisma)
        if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
        const data= await updateProject(project_id,{ titulo,
          ubicacion,
          definicion, 
          resumen,rentabilidad_estimada,
          beneficio_estimado,
          plazo_ejecucion,
          ejecucion_proyecto, cantidadInicial:cantidad,cantidadRestante:cantidad,
          precio_unitario,
          beneficioPorNFT,
          proyectoReinversion,description,
          recuperar_dinero_info,pagoTarjeta,pagoTransferencia,pagoCripto},prisma)

      return res.status(200).json(data);
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
      let data;
      if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
      switch (project.estado) {
          case "NUEVO":
            if(estado!=="PROXIMAMENTE") return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "PROXIMAMENTE":
            if(estado!=="PUBLICO") return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "PUBLICO":
            if(estado!=="EN_PROCESO" || estado!=="NO_COMPLETADO") return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "ABIERTO":
            if(estado!=="PUBLICO" ) return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "EN_PROCESO":
            if(estado!=="CERRADO") return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break
          case "CERRADO":
            if(estado!=="TERMINADO") return res.status(400).json({error:"Estado incorrecto"})
            data= await prisma.projects.update({where:{id:project.id},data:{estado:estado}})
          break;
          case "TERMINADO":
          return res.status(400).json({error:"Estado terminado"})
      }
      return res.status(200).json(data );
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const updateProjectTemplateDocs = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {
      project_id,
      template_id,
      document_type
      }= req.body;
          const isValid= await isValidTemplate(template_id)
          if(!isValid) return res.status(404).json({error:"Template no encontrado en PandaDoc"})
          const isAlready=await prisma.templates.findUnique({where:{id:template_id}})
          const project= await getProjectById(project_id,prisma)
          if(isAlready || !project) return res.status(400).json({error:"Template ya guardado o proyecto no encontrado"})
              const data= await prisma.templates.create({
              data:{
              id:template_id,
              project_id:project_id,
              document_type
            }})
      return res.status(200).json(data);
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };


//gestion user venta de proyectos
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
    const isValid= moment(openingDate).isValid()
    if(!isValid) return res.status(400).json({error:"Fecha invalida"})
    let data;
    if(!project) return res.status(404).json({error:"Proyecto no encontrado"})
    const exist = await prisma.userManage.findFirst({where:{project_id:project.id,tipoDeUser:tipoDeUser}})
  if(exist) {
     data = await prisma.userManage.update({where:{id:exist.id},data:{openingDate:new Date(openingDate),minXRENstake:minXRENstake,minXRENwallet:minXRENwallet}})
  } else  {
    data = await prisma.userManage.create({data:{project_id:project_id,tipoDeUser:tipoDeUser,openingDate:new Date(openingDate),minXRENstake:minXRENstake,minXRENwallet:minXRENwallet}})
  }
    return res.status(200).json(data );
  } catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};
  
/// gestion de pagos por transferencia bancaria 
 //endpoint que va a llamar el admin
 export const cambiarStatusDeTransferenciaParticipacion = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
  
    const {order_id,amountUSD,status,fecha_recibido,fecha_devolucion}= req.body;
    const order= await getOrderById(order_id,prisma)
    if(!order) return res.status(404).json({error:"Orden no encontrada"})
    const project= await getProjectById(order.project_id,prisma)
   let pago,template;
    if(status=='CONFIRMADO') {
      if(order?.tipo=="COMPRA" ) { 
        if(!project || !project.precio_unitario || !amountUSD) return res.status(400).json({error:"No es una transaccion de venta y/o montos no definidos"})
        const mod= amountUSD%project.precio_unitario
       const result= amountUSD/project.precio_unitario
        if(mod!=0) return res.status(400).json({error:"Monto no es relativo al precio unitario"})
         pago = await crearPago(order.user_id,amountUSD,"TRANSFERENCIA_BANCARIA",new Date(fecha_recibido),"Compra de participacion",prisma)
         template=await prisma.templates.findFirst({where:{project_id:project.id,document_type:"COMPRA"}})

        if(!template) return res.status(404).json({error:"No template id encontrado"})
        
      const docData= await crearDocumentoDeCompra(order.user_id,project.id,template.id,prisma)
      if(!docData) return res.status(500).json({error:"Falla al crear documento"})
        const newOrder= await updateOrder(order.id,{document_id:docData.id,url_sign:docData.link,status:"POR_FIRMAR",cantidad:result},prisma)
        return res.status(200).json({pago,newOrder});
      } else if (order?.tipo=="INTERCAMBIO") {
        if(!project || !project.precio_unitario  || !order.exchange_receiver) return res.status(400).json({error:"No es una transaccion de usuario y/o montos definidos"})

              pago = await crearPago(order.user_id,project.precio_unitario,"TRANSFERENCIA_BANCARIA",new Date(fecha_recibido),"Compra de participacion por intercambio",prisma)
              template=await prisma.templates.findFirst({where:{project_id:project.id,document_type:"INTERCAMBIO"}})

              if(!template) return res.status(404).json({error:"No template  encontrado"})
            
              const docData= await crearDocumentoDeIntercambio(order.user_id,order.exchange_receiver,project.id,template.id,prisma)
              if(!docData) return res.status(500).json({error:"Falla al crear documento"})
              const newOrder= await updateOrder(order.id,{document_id:docData.id,url_sign:docData.link,status:"POR_FIRMAR"},prisma)
              return res.status(200).json({pago,newOrder});
      }
    
    } else if(status=="CANCELADO"){
      const user= await getUserById(order.user_id,prisma)
      if(!user) return res.status(404).json({error:"USUARIO NO ENCONTRADO"})
      await sendPagoCancelado(user?.email,order.id,`TRANSFERENCIA POR COMPRA DE PARTIPACION EN EL PROYECTO ${project?.titulo}`)
      const newOrder= await updateOrder(order.id,{status:"PAGO_CANCELADO"},prisma)
      return res.status(200).json(newOrder);
    } 
    else if (status=="DEVUELTO") {
      const user= await getUserById(order.user_id,prisma)
      if(!user) return res.status(404).json({error:"USUARIO NO ENCONTRADO"})
      await sendPagoDevuelto(user?.email,order.id,`TRANSFERENCIA POR COMPRA DE PARTIPACION EN EL PROYECTO ${project?.titulo} HA SIDO DEVUELTA`,amountUSD,fecha_devolucion)
      const newOrder= await updateOrder(order.id,{status:"PAGO_DEVUELTO"},prisma)
      return res.status(200).json(newOrder);
    }
  }
  catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};
//endpoint para gestionar que ya el admin ha pagado al vendedor por alguna participacion
export const terminarIntercambio = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {order_id}= req.body;
    const order= await getOrderById(order_id,prisma)
    if(!order || order.status!="FIRMADO_POR_ENTREGAR" || order.tipo!="INTERCAMBIO") return res.status(404).json({error:"Orden no encontrada"})
    const endExchange= await xperiendNFT.endExchange(order.nft_id,order.exchange_receiver)
    const updated= await updateOrder(order_id,{status:"PAGADO_Y_ENTREGADO_Y_FIRMADO"},prisma)
    res.json({endExchange,updated})
  }
  catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};

export const cancelarIntercambio = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {order_id}= req.body;
    const order= await getOrderById(order_id,prisma)
    if(!order || order.status!="FIRMADO_POR_ENTREGAR" || order.tipo!="INTERCAMBIO") return res.status(404).json({error:"Orden no encontrada"})
    const cancelExchange= await xperiendNFT.cancelExchange(order.nft_id)
    const updated= await updateOrder(order_id,{status:"PAGO_CANCELADO"},prisma)
    res.json({cancelExchange,updated})
  }
  catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};

///Vistas
// imagenes, escenario, cuenta, fechas,userSale


export const getAllProjects= async(req:Request,res:Response) => {
  try {    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    let data=[];
    let escenario,fechas,cuenta,imagenes,userSale;
    const projects= await prisma.projects.findMany()
    for( let project of projects) {
      escenario= await prisma.escenario_economico.findMany({where:{project_id:project.id}})
      fechas= await prisma.gestion_fechas.findMany({where:{project_id:project.id}})
      if (project.cuenta_id){
        cuenta= await prisma.cuentas.findUnique({where:{id:project.cuenta_id}})
      }
      userSale= await prisma.userManage.findMany({where:{project_id:project.id}})
      imagenes= await prisma.projectImages.findMany({where:{project_id:project.id}})
      
      data.push({
        project,
        escenario,
        fechas,
        cuenta,
        imagenes,
        userSale

      })
    }
    return res.json(data)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error:e})
    }  
}


export const getCuentas= async(req:Request,res:Response) => {
  try {    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const cuentas = await prisma.cuentas.findMany()
    return res.json(cuentas)
  } catch(e) {

    console.log(e)
    return res.status(500).json({error:e})
    }  
}




export const getTemplatesByPandaDoc= async(req:Request,res:Response) => {
  try {    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const data= await getTemplates()
    return res.json(data.results)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error:e})
    }  
}

 
 


///KYC
export const updateKYCStatus=async(req:Request, res:Response) => {
  try {
       // @ts-ignore
   const prisma = req.prisma as PrismaClient;
   const {kyc_id,status,motivo_rechazo}=req.body;

   const updated= await updateKyc(kyc_id,{status,motivo_rechazo},prisma)
  return res.json(updated)
  } catch (e) {
    console.log(e)
    res.status(500).json({error:e})
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const users = await getAllUsers(prisma);
    console.log(users)
    let kycImages;
    let data=[];
    for (let user of users) {
      const kyc=await getKycInfoByUser(user.id,prisma)
      if(kyc) {
         kycImages= await prisma.kycImages.findMany({where:{info_id:kyc.id}})
      }
      data.push({
        userId:user.id,
       userName:user.userName,
       googleId:user.googleID,
        email: user.email,
        referrallFriend:user.referallFriend,
        newsletter:user.newsletter,
        kycInfo:kyc,
        kycImages
      });
    }
    return res.status(200).json(data);
  } catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};
//gestion de venta de XREN 

export const selectCuentaBancariaXREN=async(req:Request, res:Response) => {
  try {
       // @ts-ignore
   const prisma = req.prisma as PrismaClient;
   const {cuenta_id}=req.body;
   const exist = await prisma.cuentas.findFirst({where:{xrenAccount:true}}) 
  if (exist && exist.id!=cuenta_id) await prisma.cuentas.update({where:{id:exist.id},data:{xrenAccount:false}})
  
  const updated= await prisma.cuentas.update({where:{id:cuenta_id},data:{xrenAccount:true}})
   
  return res.json(updated)
  } catch (e) {
    console.log(e)
    res.status(500).json({error:e})
  }
};
export const cambiarStatusDeTransferenciaParaXREN= async (req: Request, res: Response) => {
  // @ts-ignore
  const prisma = req.prisma as PrismaClient;
  let pago;
  try {
  const {order_id,success}= req.body;
  const order= await prisma.ordersXREN.findUnique({where:{id:order_id}})
  if(!order) return res.status(404).json({error:"Orden no encontrada"})
  const user= await getUserById(order.user_id,prisma)
if(!user) return res.status(404).json({error:"USUARIO NO ENCONTRADO"})
const wallet= (await getKycInfoByUser(user.id,prisma))?.wallet

    let newOrder;
    if(success) {
        if(order?.tipo!=="COMPRA") return res.status(400).json({error:"No es una transaccion de compra"})
    
         pago = await crearPago(order.user_id,order.amountUSD,"TRANSFERENCIA_BANCARIA",new Date(),`Compra de ${order.unidades} XREN`,prisma)
        const mint= await saleContract.functions.addUsersToVesting(ethers.utils.parseEther(order.unidades.toString()),wallet)

         newOrder= await prisma.ordersXREN.update({where:{id:order.id},data:{hash:mint.hash,status:"PAGO_EXITOSO_ENTREGADO"}})
         await sendThanksBuyEmail(user.email,order.unidades,"TRANSFERENCIA_BANCARIA")
         return res.status(200).json({pago,newOrder});

    } else  {
       newOrder= await prisma.ordersXREN.update({where:{id:order.id},data:{status:"ERROR_EN_PAGO"}})
      return res.status(200).json(newOrder);
    }
  } catch ( error) {
    console.log(error)
    await prisma.pagos.delete({where:{id:pago?.id}})
    res.status(500).json( error );
  }
};
export const getAllUsersByProject = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {project_id}= req.body;
    const orders= await prisma.orders.findMany({where:{project_id,tipo:"COMPRA",status:"PAGADO_Y_ENTREGADO_Y_FIRMADO"}})
    
    let data=[];
    for (let order of orders) {
      const user= await getUserById(order.user_id,prisma)
      data.push({
        userId:order.user_id,
       userName:user?.userName,
        email: user?.email,
        referrallFriend:user?.referallFriend,
        newsletter:user?.newsletter,
      });
    }
    return res.status(200).json(data);
  } catch ( error) {
    console.log(error)
    res.status(500).json( error );
  }
};
 


///funciones de super admin
///Crear un nuevo admin 
export const changeRolUser= async(req:Request,res:Response) => {
  try {    
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {user_id, rol} = req.body 
    const usuario= await getUserById(user_id,prisma)
    let data;
    if(!usuario) return res.status(404).json({error:"Usuario no encontrado"})
    data=await updateUser(user_id,{userRol:rol},prisma)
    return res.json(data)

  } catch(error) {
    return res.status(500).json(error)
    }  
}