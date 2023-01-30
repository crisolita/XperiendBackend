import Joi from "joi";
export const querySchemaRegistro = Joi.object({
  fullName: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  referallCode: Joi.string().min(6).max(6),
});
export const querySchemaKYC = Joi.object({
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  Birthday: Joi.date().timestamp("unix"),
  Nationality: Joi.string().required(),
  CountryOfResidence: Joi.string().required(),
  Email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  Occupation: Joi.string().required(),
  AddressLine1: Joi.string().required(),
  City: Joi.string().required(),
  Region: Joi.string().required(),
  PostalCode: Joi.string().required(),
  Country: Joi.string().required(),
});
