import { Estado, PrismaClient } from "@prisma/client";


export const updateProyecto = async (
  id: number,
  data: {   nombre?:string,
    cantidad?:number,
    precioUnitario?:number
    estado?:Estado,
    description?:string
    ubicacion?:string,
    plazo_meses?:number
    fecha_proximamente?:Date,
    fecha_publico?:Date,
    fecha_abierto?:Date,
    fecha_cerrado?:Date,
    fecha_en_proceso?:Date
    fecha_reinversion?:Date
    fecha_terminado?:Date,
    costo_ejecucion_conservador?:number,
    beneficio_conservador?:number,
    rentabilidad_conservador?:number,
    costo_ejecucion_moderado?:number,
    beneficio_moderado?:number,
    rentabilidad_moderado?:number,
    costo_ejecucion_favorable?:number,
    beneficio_favorable? :number,
    rentabilidad_favorable?  :number,
    concepto_bancario?:string
    cuenta_id?:number,
    count_image?:number},
  prisma: PrismaClient
) => {
  return await prisma.projects.update({
    where: { id: id },
    data: {
      ...data,
    },
  });
};

