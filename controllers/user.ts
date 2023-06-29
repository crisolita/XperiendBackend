import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createJWT, generateRandomString } from "../utils/utils";
import {
  findUsername,
  getAllUsers,
  getUserByEmail,
  getUserByGoogleID,
  updateUser,

} from "../service/user";
import { sendAuthEmail, sendWelcomeEmail } from "../service/mail";
// import { google } from 'googleapis';
// import axios from "axios";



export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");


  export const getAllUsersController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const users = await getAllUsers(prisma);
      const data: { [key: string]: any } = {};
      users.forEach((user) => {
        data[user.id] = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
      });
      return res.status(200).json({ data:data });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, first_name, last_name, password, referallUser,userName} = req?.body;
    const user = await getUserByEmail(email, prisma);
    let username;
    let referallFriend;
      username = await findUsername(userName, prisma);
    if(username) return res.json({error:"Username ya existe!!"})
    if (referallUser) {
      referallFriend = await findUsername(referallUser, prisma);
      if (!referallFriend) return res.status(404).json({error:"Codigo de referido no valido"})
    }
    if (!user) {
      const newUser=await prisma.user.create({
        data: {
          email: email,
          first_name:first_name,
          last_name:last_name,
          password: bcrypt.hashSync(password, salt),
          userName:userName,
          referallFriend: referallUser? referallUser :null,
        },
      });
        await sendWelcomeEmail(email,userName);
        res.status(200).json(
        { data: { email: email, first_name: first_name,last_name:last_name, referallCode:userName,userName:userName} }
      );
      } else {
      res.status(400).json({error:"Email ya registrado"})
    }
  } catch ( error ) {
    console.log(error)
    res.status(500).json({error:error})
  }
};
// export const userRegisterGoogle = async (req: Request, res: Response) => {
//   try {
//     const salt = bcrypt.genSaltSync();
//     // @ts-ignore
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       `https://localhost:3000`,
//     );
//     const {tokens}=req?.body
//     const scopes = [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ];

//     const URL= oauth2Client.generateAuthUrl({
//       access_type: 'online',
//       prompt: 'consent',
//       scope: scopes, // If you only need one scope you can pass it as string
//     });

//         res.status(200).json(
//         { data: {URL} }
//       );
//       } catch ( error ) {
//     console.log(error)
//     res.status(500).json({error:error})
//   }
// };


export const userLoginController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user ) {
      if (bcrypt.compareSync(authCode,user.authToken? user.authToken :""))
        return res.status(200).json(
       { data: {email:user.email,userid:user.id,first_name:user.first_name,last_name:user.last_name,  token: createJWT(user)} }
        );
      else
        return res.status(403).json({ error: "Token auth incorrecto." });
    } else {
      return res.status(400).json({ error: "Email incorrecto" });
    }
  } catch ( error ) {
    return res.status(500).json({ error: error });

  }
};
export const getRecoveryCode =async (req: Request, res: Response) => {
  try {
    let authCode = JSON.stringify(
      Math.round(Math.random() * (999999 - 100000) + 100000)
    );
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email} = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user) {
      await sendAuthEmail(email, authCode);
      await updateUser(user.id.toString(), {authToken:bcrypt.hashSync(authCode, salt)},prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch(error) {
    return res.status(500).json({ error: error });
  } 
}
export const getAuthCode = async (req: Request, res: Response) => {
  try {
    let authCode = JSON.stringify(
      Math.round(Math.random() * (999999 - 100000) + 100000)
    );
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, password} = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      await sendAuthEmail(email, authCode);
      await updateUser(user.id.toString(),{authToken:bcrypt.hashSync(authCode, salt)} ,prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { newPassword, authCode, email} = req?.body;
    const user= await getUserByEmail(email,prisma)
    if (user) {
      if (bcrypt.compareSync(authCode,user.authToken? user.authToken : "")) {
        const salt = bcrypt.genSaltSync();
        await updateUser(
          user.id.toString(),
          { password: bcrypt.hashSync(newPassword, salt) },
          prisma
        );
        return res.status(200).json({ data: {email:user.email} });
      } else
        return res.status(400).json({ error: "Token 2fa incorrecto." });
    } else {
      return res.status(404).json({ error: "Usuario no existe." });
    }
  } catch ( error ) {
    return res.status(500).json({ error: error });
  }
};

