import { PrismaClient } from "@prisma/client";
import { userInfo } from "os";

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
export const findReferall = async (referall: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { referall },
  });
};

export const updateUser = async (
  id: string,
  data: { email?: string; password?: string; mngpayId?: any | undefined},
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
