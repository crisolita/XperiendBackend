import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/utils";
import {
  createUsername,
  findUsername,
  getAllUsers,
  getKycInfoByUser,
  getUserByEmail,
  getUserByGoogleID,
  getUserById,
  updateUser,

} from "../service/user";
import { sendAuthEmail, sendWelcomeEmailConSubs, sendWelcomeEmailSinSubs } from "../service/mail";
import { OAuth2Client } from 'google-auth-library';
import axios from "axios";
import { getProjectById } from "../service/backoffice";
import { getImage } from "../service/aws";
const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  redirectUri: 'https://localhost:3000',
});


export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");



export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, password, referallUser,userName,newsletter} = req?.body;
    const user = await getUserByEmail(email, prisma);
    let username;
    let referallFriend;
      username = await findUsername(userName, prisma);
    if(username) return res.status(400).json({error:"Username ya existe!!"})
    if (referallUser) {
      referallFriend = await findUsername(referallUser, prisma);
      if (!referallFriend) return res.status(404).json({error:"Codigo de referido no valido"})
    }
    if (!user) {
      const newUser=await prisma.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, salt),
          userName:userName,
          referallFriend: referallUser? referallUser :null,
          newsletter:newsletter,
          userRol:"CLIENT"
        },
      });
      if(newsletter) {
        await sendWelcomeEmailConSubs(email,userName);
      } else {
        await sendWelcomeEmailSinSubs(email,userName);
      }
        
        res.status(200).json(
        { email: email, referallCode:userName,userName:userName} 
      );
      } else {
      res.status(400).json({error:"Email ya registrado"})
    }
  } catch ( error ) {
    console.log(error)
    res.status(500).json(error)
  }
};
export const userGoogleController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {token}=req.body
   
    const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;
    const response = await axios.get(userInfoUrl);
    const userName= await createUsername(response.data.given_name,response.data.family_name,prisma)
    if(!response.data || !response.data.verified_email || !userName) return res.status(400).json({error:"Invalid Token"})
    const exist= await getUserByGoogleID(response.data.id,prisma)
  let user;
  console.log(response.data)
  if(!exist ) {
      user= await prisma.user.create({data:{
        email:response.data.email,
        googleID:response.data.id,
        userName:userName,
        userRol:"CLIENT"
      }})
      await sendWelcomeEmailSinSubs(user.email,userName);
      res.status(200).json({email:user.email,userid:user.id,userName:user.userName,referallFriend:user.referallFriend,kycStatus:user.kycStatus,  token: createJWT(user)});
    } else if (exist.email==response.data.email){
      res.status(200).json({email:exist.email,userid:exist.id,userName:exist.userName,referallFriend:exist.referallFriend,kycStatus:exist.kycStatus,  token: createJWT(exist)});
    }    
      } catch ( error ) {
    console.log(error)
    res.status(500).json({error:error})
  }
};


export const userLoginController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user ) {
      if (bcrypt.compareSync(authCode,user.authToken? user.authToken :"")) 
        return res.status(200).json(
       {email:user.email,userid:user.id,userName:user.userName,referallFriend:user.referallFriend, kycStatus:user.kycStatus, token: createJWT(user)} 
        );
      else
        return res.status(403).json({ error: "Token auth incorrecto." });
    } else {
      return res.status(400).json({ error: "Email incorrecto" });
    }
  } catch ( error ) {
    return res.status(500).json(error);

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
    if (user && user.userName) {
      await sendAuthEmail(email, authCode,user.userName);
      await updateUser(user.id, {authToken:bcrypt.hashSync(authCode, salt)},prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch(error) {
    return res.status(500).json(error);
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
    if (user && user.password && bcrypt.compareSync(password, user.password) && user.userName) {
      await sendAuthEmail(email, authCode,user.userName);
      await updateUser(user.id,{authToken:bcrypt.hashSync(authCode, salt)} ,prisma);
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
    return res.status(500).json(error);
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
          user.id,
          { password: bcrypt.hashSync(newPassword, salt) },
          prisma
        );
        return res.status(200).json({email:user.email});
      } else
        return res.status(400).json({ error: "Token 2fa incorrecto." });
    } else {
      return res.status(404).json({ error: "Usuario no existe." });
    }
  } catch ( error ) {
    return res.status(500).json({ error: error });
  }
};
export const changeNewsletter = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;
    
    const user= await getUserById(USER.id,prisma)
    let userUpdate;
    if(user?.newsletter) {
      userUpdate=await updateUser(USER.id,{newsletter:false},prisma)
    } else {
      userUpdate=await updateUser(USER.id,{newsletter:true},prisma)
    }
      return res.status(200).json(
       {email:user?.email,newsletter:userUpdate?.newsletter},
      );
  } catch(error) {
    console.log(error)
    return res.status(500).json(error);
  } 
}

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;  
    const user= await getUserById(USER.id,prisma)

    return res.json({email:user?.email,referallFriend:user?.referallFriend,userName:user?.userName,googleId:user?.googleID,kycStatus:user?.kycStatus,rol:user?.userRol,newsletter:user?.newsletter})
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}

export const getkycUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
 
    const {user_id}= req.body;
    const user= await getUserById(user_id,prisma)
    let kycImgs=[];
    const kyc=await getKycInfoByUser(user_id,prisma)
    if(kyc) {
      const kycImgsKey= await prisma.kycImages.findMany({where:{info_id:kyc?.id}})
      for (let key of kycImgsKey) {
        const ruta= await getImage(key.path)
        kycImgs.push({
          rol:key.rol,
          path:ruta
        })
      }
    }
    return res.json({kyc,kycImgs})
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}

export const setFavorite = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;  
    const {project_id}=req.body
    let user= await getUserById(USER.id,prisma)
    if(!user) return res.status(404).json({error:"Usuario no encontrado"})
    const project= await getProjectById(project_id,prisma)
  if(!project)return res.status(404).json({error:"Proyecto no encontrado"})
     user= await prisma.user.update({where:{id:USER.id},data:{favoritos:[...user.favoritos,project_id]}})
    return res.json(user.favoritos)
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}
export const getFavorites = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;  
    let user= await getUserById(USER.id,prisma)
    if(!user) return res.status(404).json({error:"Usuario no encontrado"})

    let data=[];
    for (let favorito of user.favoritos) {
      const project= await getProjectById(favorito,prisma)
      data.push({
       project
      });
    }
    return res.json(data)
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}

