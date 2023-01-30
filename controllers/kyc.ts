import { Request, Response } from "express";
var mangopay = require("mangopay2-nodejs-sdk");

var api = new mangopay({
  clientId: "devel",
  clientApiKey: "Aw9jdSgkJEUnUH9W5gEqpiU4a91AVB8jLykHxr3KsCbvViOHGP",
});
export const createNaturalUser = async (req: Request, res: Response) => {
  try {
    const {
      FirstName,
      LastName,
      Birthday,
      Nationality,
      CountryOfResidence,
      Email,
      Occupation,
      AddressLine1,
      City,
      Region,
      PostalCode,
      Country,
    } = req?.body;
    var myUser = new api.models.Users({
      PersonType: "NATURAL",
      FirstName: FirstName,
      LastName: LastName,
      Birthday: Birthday,
      Nationality: Nationality,
      CountryOfResidence: CountryOfResidence,
      Tag: "xperiend",
      Email: Email,
      Occupation: Occupation,
      Address: new api.models.Address({
        AddressLine1: AddressLine1,
        City: City,
        Region: Region,
        PostalCode: PostalCode,
        Country: Country,
      }),
    });
    api.Users.create(myUser)
      .then(function () {
        console.log(myUser);
        res.status(200).json({ data: myUser });
        console.log(myUser.FirstName + " creado:  " + myUser.CreationDate);
      })
      .catch(function (error: any) {
        console.log("Natural user creation failed", error);
        res.status(400).json({ error: error });
      });
  } catch (e) {}
};
