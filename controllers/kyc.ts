// import { Request, Response } from "express";
// import { getUserByEmail, getUserById, updateUser } from "../service/user";
// import mangopay from 'mangopay2-nodejs-sdk'
// import fs from "fs/promises"
// import { Models } from "mangopay2-nodejs-sdk/typings/models";
// import axios from "axios";
// var api = new mangopay({
//   clientId: "devel",
//   clientApiKey: "Aw9jdSgkJEUnUH9W5gEqpiU4a91AVB8jLykHxr3KsCbvViOHGP",
// });
// export const uploadKycDocuments = async (req: Request, res: Response) => {
//   try {
//     const {userId,file}=  req?.body;
//       // @ts-ignore
//       const prisma = req.prisma as PrismaClient;
//       const user = await getUserById(userId,prisma);
//       await fs.writeFile("temporary.pdf",file,'base64')

//     let newDoc = new api.models.KycDocument({
//       "Tag": "Xperiend",
//       "Type": "IDENTITY_PROOF"
//       })
//   //  console.log(newDoc)
//    if(user?.mngpayId) {
//      const create= await api.Users.createKycDocument(user.mngpayId,newDoc);
//     //  console.log(create)
//      const file= await api.Users.createKycPageFromFile(user.mngpayId,create.Id,"temporary.pdf");
//      const result =  await api.Users.updateKycDocument(user.mngpayId,{Id:create.Id,Status:"VALIDATION_ASKED"})
//      await fs.unlink("temporary.pdf")

//      res.status(200).json({ result });

//    } else {
//     res.status(400).json({error: "Bad user id, there is not mangopay id"})
//    }
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error });

//   }
// };
// export const createNaturalUser = async (req: Request, res: Response) => {
//   try {
//     const {
//       Email,
//       FirstName,
//       LastName,
//       Birthday,
//       Nationality,
//       CountryOfResidence,
//       Occupation,
//       Address
//     } = req?.body;
//      // @ts-ignore
//      const prisma = req.prisma as PrismaClient;
//      const user = await getUserByEmail(Email, prisma);
//     if(!user) return res.status(400).json({data: "Email incorrecto"});
//     api.Users.create({
//       "FirstName": FirstName,
//         "LastName": LastName,
//         "Address": Address,
//         "Birthday": Birthday,
//         "Nationality": Nationality,
//         "CountryOfResidence": CountryOfResidence,
//         "Occupation": Occupation,
//         "PersonType": "NATURAL",
//         "Email": Email,
//         "Tag": "Xperiend",
//     })
//     .then(
//       async function (respuesta
//       ) {
//         const update = await updateUser(user.id.toString(),{mngpayId:respuesta.Id},prisma);
//         console.log(respuesta)
//           res.status(200).json({ data: respuesta });
//         }
//       )
//       .catch(function (error: any) {
//         console.log("Natural user creation failed", error);
//         res.status(400).json({ error: error });
//       });
//   } catch (error) {
//     res.status(500).json({ error });

//   }
// };
// type registerData = {
//   email: string,
//   phone: string,
//   first_name: string,
//   last_name: string,
//   newsletter: boolean,
//   password: string
// };
// async function registerStocken(res:Response,email:string,phone:string,first_name:string,last_name:string,newsletter:boolean,password:string) {
// try {
//   const { data } = await axios.post<registerData>(
//     'https://stocken-backend.cloto.pw/api/v1/users/',
//     { email:email,phone: phone? phone:"",first_name:first_name,last_name:last_name,newsletter:newsletter,password:password}
//   );
//   console.log(JSON.stringify(data, null, 4));
//   return  res.json(
//     {
//       data: { email: email, first_name: first_name,last_name:last_name,"ok":true },
//     }
//   );
// } catch (error) {
//   if (axios.isAxiosError(error)) {
//     console.log('error message: ', error.message);
//     return res.json({error:error});
//   } else {
//     console.log('unexpected error: ', error);
//     return res.json({error:error});
//   }
// }
// }

