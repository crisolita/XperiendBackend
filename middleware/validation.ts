import Joi from "joi";
export const querySchemaRegistro = Joi.object({
  password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?])[A-Za-z0-9`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?]{8,}$/)).messages({  'string.base': `Contraseña debe ser de tipo texto`,
  'string.empty': `Contraseña no puede estar vacio`,
  'string.min': `Contraseña debe tener al menos 8 caracteres`,
  'string.required': `Contraseña es requerida`,
'string.pattern.base':"No cumple las condiciones de contraseña"}),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required().messages({'string.default':"El email debe ser valido",'string.required': `Email es requerido`,'string.email':"Debe ser un email valido"}),
    referallUser: Joi.string().min(6),
    userName: Joi.string().min(6),
    newsletter:Joi.boolean()
});
export const querySchemaUGetAuth = Joi.object({
  password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?])[A-Za-z0-9`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?]{8,}$/)).messages({  'string.base': `Contraseña debe ser de tipo texto`,
  'string.empty': `Contraseña no puede estar vacio`,
  'string.min': `Contraseña debe tener al menos 8 caracteres`,
  'string.required': `Contraseña es requerida`,
'string.pattern.base':"No cumple las condiciones de contraseña"}),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required().messages({'string.default':"El email debe ser valido"}),
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
  Address: Joi.string().required(),
});
