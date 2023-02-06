import { Request, Response } from "express";
import { getUserByEmail, updateUser } from "../service/user";
import mangopay from 'mangopay2-nodejs-sdk'

var api = new mangopay({
  clientId: "devel",
  clientApiKey: "Aw9jdSgkJEUnUH9W5gEqpiU4a91AVB8jLykHxr3KsCbvViOHGP",
});
export const createNaturalUser = async (req: Request, res: Response) => {
  try {
    const {
      Email,
      FirstName,
      LastName,
      Birthday,
      Nationality,
      CountryOfResidence,
      Occupation,
      Address
    } = req?.body;
     // @ts-ignore
     const prisma = req.prisma as PrismaClient;
     const user = await getUserByEmail(Email, prisma);
    if(!user) return res.status(400).json({data: "Email incorrecto"});
    api.Users.create({
      "FirstName": FirstName,
        "LastName": LastName,
        "Address": Address,
        "Birthday": Birthday,
        "Nationality": Nationality,
        "CountryOfResidence": CountryOfResidence,
        "Occupation": Occupation,
        "PersonType": "NATURAL",
        "Email": Email,
        "Tag": "Xperiend",
    })
    .then(
      async function (respuesta
      ) {
        const update = await updateUser(user.id.toString(),{mngpayId:respuesta.Id},prisma);
        console.log(respuesta)
          res.status(200).json({ data: respuesta });
        }
      )
      .catch(function (error: any) {
        console.log("Natural user creation failed", error);
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error });

  }
};
