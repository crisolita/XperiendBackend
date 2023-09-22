import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/utils";
import { getKycInfoByUser } from "../service/user";

export function isKycRequired(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const prisma = req.prisma as PrismaClient;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_PRIVATE_KEY as string, async (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    // @ts-ignore
    req.user = user;
    const kycInfo= await getKycInfoByUser(user.id,prisma)

    if (kycInfo?.status!="APROBADO") return res.sendStatus(403);

    next();
  });
}
