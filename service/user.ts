import { PrismaClient } from "@prisma/client";

export const getUserById = async (id: number, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany({
    where: {
      NOT: {
        id: 1,
      },
    },
  });
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
  data: { email?: string; password?: string; clientSecret?: string,authToken?:string,},
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
