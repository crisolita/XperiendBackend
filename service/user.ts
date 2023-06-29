import { PrismaClient } from "@prisma/client";

export const getUserById = async (id: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
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
  id: string,
  data: { email?: string; password?: string; mngpayId?: any | undefined,authToken?:string,},
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      ...data,
    },
  });
};

export const updateUserAuthToken = async (
  id: string,
  authToken: string,
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      authToken,
    },
  });
};
