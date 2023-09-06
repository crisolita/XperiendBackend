import { METODODEPAGO, PrismaClient } from "@prisma/client";

export const crearPago = async (user_id:number,monto:number,metodo_de_pago:METODODEPAGO,fecha:Date,concepto:string, prisma: PrismaClient) => {
    return await prisma.pagos.create({
     data:{
        user_id,
        monto,
        metodo_de_pago,fecha,concepto
     }
    });
  };