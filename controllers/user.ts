import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createJWT,
  generateRandomString,
  normalizeResponse,
} from "../utils/utils";
import {
  findReferall,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserAuthToken,
  updateUserWalletAddress,
} from "../service/user";
import { sendEmail } from "../service/mail";
import { createWallet, manageKeys } from "../service/web3";

export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");
const compareStrings = (str1: string, str2: string) =>
  str1?.toLowerCase().trim() === str2?.toLowerCase().trim();

export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, fullName, password, referallCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    let referall;
    let resultReferall;
    let referallFriend;
    do {
      referall = generateRandomString(6);
      resultReferall = await findReferall(referall, prisma);
    } while (resultReferall);
    if (referallCode) {
      referallFriend = await findReferall(referallCode, prisma);
      if (!referallFriend) throw new Error("Codigo de referido no valido");
    }
    if (!user) {
      await prisma.user.create({
        data: {
          email: email,
          fullName: fullName,
          password: bcrypt.hashSync(password, salt),
          referall: referall,
          referallFriend: referallCode ? referallCode : "",
        },
      });

      res.json(
        normalizeResponse({
          data: { email: email, fullName: fullName },
        })
      );
    } else {
      throw new Error("Email ya registrado");
    }
  } catch ({ message: error }) {
    res.json(normalizeResponse({ error }));
  }
};

let authCode = JSON.stringify(
  Math.round(Math.random() * (999999 - 100000) + 100000)
);
export const userLoginController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, password } = req?.body;
    const user = await getUserByEmail(email, prisma);

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      await sendEmail(email, authCode);
      await updateUserAuthToken(
        user.id.toString(),
        bcrypt.hashSync(authCode, salt),
        prisma
      );
      return res.json(
        normalizeResponse({
          data: `Se ha enviado código de validación al correo: ${email}`,
        })
      );
    } else {
      throw new Error("Email o contraseña incorrectos");
    }
  } catch ({ message: error }) {
    res.json(normalizeResponse({ error }));
  }
};
export const userTokenValidate = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user) {
      if (bcrypt.compareSync(authCode, user.authToken ? user.authToken : ""))
        return res.json(
          normalizeResponse({ data: user, token: createJWT(user) })
        );
      else
        return res.json(normalizeResponse({ data: "Token 2fa incorrecto." }));
    } else {
      throw new Error("Email incorrecto");
    }
  } catch ({ message: error }) {
    res.json(normalizeResponse({ error }));
  }
};

export const userWalletController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user as User;
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { wallet } = req?.body;
    const updatedUser = await updateUserWalletAddress(
      `${user.id}`,
      wallet,
      prisma
    );
    res.json(normalizeResponse({ data: updatedUser }));
  } catch ({ message: error }) {
    res.json(normalizeResponse({ error }));
  }
};

// export const userController = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const prisma = req.prisma as PrismaClient;
//     const users = await getAllUsers(prisma);
//     const data: { [key: string]: any } = {};
//     users.forEach((user) => {
//       data[user.id] = {
//         fullName: convertFullName(user.fullName),
//         balance: user.balance,
//         wallet: user.wallet,
//       };
//     });
//     return res.json(normalizeResponse({ data }));
//   } catch ({ message: error }) {
//     res.json(normalizeResponse({ error }));
//   }
// };
// export const userEditController = (req: Request, res: Response) => {
//   try {
//     res.json(normalizeResponse({ data: true }));
//   } catch ({ message: error }) {
//     res.json(normalizeResponse({ error }));
//   }
// };

export const recoverPasswordController = async (
  req: Request,
  res: Response
) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { id, email, fullName, password } = req?.body;
    const user = await getUserById(id, prisma);

    if (user) {
      if (
        compareStrings(fullName, convertFullName(user.fullName)) &&
        Number(id) === user.id &&
        email === user.email
      ) {
        const salt = bcrypt.genSaltSync();
        const newUser = await updateUser(
          id,
          {
            password: bcrypt.hashSync(password, salt),
          },
          prisma
        );
        return res.json(
          normalizeResponse({ data: newUser, token: createJWT(newUser) })
        );
      } else {
        throw new Error("Error");
      }
    } else {
      throw new Error("No existe el usuario");
    }
  } catch ({ message: error }) {
    res.json(normalizeResponse({ error }));
  }
};
