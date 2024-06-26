import { Estado_civil, NIVEL_DE_INVERSION, PrismaClient, Projects, Regimen_matrimonial, StatusKYC, USERROL } from "@prisma/client";

export const getUserById = async (id: number, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export const getUserByGoogleID = async (googleID: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { googleID:googleID },
  });
};
export const findUsername = async (userName: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { userName },
  });
};

export const updateUser = async (
  id: number,
  data: { email?: string; password?: string;kycStatus?:StatusKYC,motivo_rechazo_kyc?:string, clientSecret?: string,authToken?:string,newsletter?:boolean,userRol?:USERROL},
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      ...data,
    },
  });
};
export const getKycInfoByUser = async (
  id:number,
  prisma: PrismaClient
)=>{
  return await prisma.kycInfo.findUnique({
    where: { user_id: id },
  });
}
export const updateKyc = async (
  id: number,
  data: { status?:StatusKYC,estado_civil?:Estado_civil,
    regimen_matrimonial?:Regimen_matrimonial,document_number?:string,motivo_rechazo?:string,name?:string,lastname?:string,country_born?:string,birth?:Date,telf?:string,nivel_inversion?:NIVEL_DE_INVERSION,address?:string,document?:string,city?:string,postalCode?:string,state?:string,country?:string,wallet?:string},
  prisma: PrismaClient
) => {
  return await prisma.kycInfo.update({
    where: { id: id },
    data: {
      ...data,
    },
  });
};


export const createUsername = async (
  given_name:string,
  family_name:string,
  prisma: PrismaClient
) => {
  let count=1;
  let noRepeat,userName;
  while (!noRepeat) {
     userName=`${given_name}${family_name}${count}`
    const exist= await prisma.user.findUnique({where:{userName}})
    if(!exist) {
      noRepeat=true
    } else {
      count++
    }
  }
  return userName;
};