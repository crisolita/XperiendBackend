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
  name:Joi.string(),lastname:Joi.string(),country_born:Joi.string(),birth:Joi.string(),telf:Joi.string(),address:Joi.string(),document:Joi.string(),document_number:Joi.string(),city:Joi.string(),postalCode:Joi.number(),state:Joi.string(),country:Joi.string(),foto_dni_frontal:Joi.string(),foto_dni_trasera:Joi.string(),wallet:Joi.string()
});


