import { Request, Response } from "express";
import { getUserByEmail, getUserById, updateUser } from "../service/user";
import mangopay from 'mangopay2-nodejs-sdk'
import fs from "fs/promises"
// import imag from "./imag.png"
// async function no() {
// await fs.writeFile("prueba.png","iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=",'base64')
// }
// no()
var api = new mangopay({
  clientId: "devel",
  clientApiKey: "Aw9jdSgkJEUnUH9W5gEqpiU4a91AVB8jLykHxr3KsCbvViOHGP",
});
export const uploadKycDocuments = async (req: Request, res: Response) => {
  try {
    const {userId}=  req?.body;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const user = await getUserById(userId,prisma);
    const newDoc = new api.models.KycDocument({
      "Tag": "custom meta",
      "Type": "IDENTITY_PROOF"
      })
  //  console.log(newDoc)
   if(user?.mngpayId) {
     const create= await api.Users.createKycDocument(user.mngpayId,newDoc);
    //  console.log(create)
    //  fs.readFile("./../prueba.png", {encoding})
    //  var image = "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";
    //  var bitmap= Buffer.from(image, 'base64');
    //  const File={File: bitmap.toString()}
     const file= await api.Users.createKycPageFromFile(user.mngpayId,create.Id,"/Users/crisolcova/XperiendBackend/Cap_13.pdf");
    
     console.log(file)
     res.status(200).json({ file });

   } else {
    res.status(400).json({data: "Bad user id, there is not mangopay id"})
   }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });

  }
};
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
function BufferFrom(image: string, arg1: string) {
  throw new Error("Function not implemented.");
}

