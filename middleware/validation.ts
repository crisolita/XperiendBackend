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



// backOffice

export const querySchemaCreate_project = Joi.object({
  titulo:Joi.string(),
      ubicacion:Joi.string(),
      definicion:Joi.string(), 
      resumen:Joi.string()
    });
    export const querySchemaDeleteImage = Joi.object({
      path:Joi.string()
    });

    export const querySchemaAddImage = Joi.object({
        project_id:Joi.number().required(),
        images: Joi.array().items(
          Joi.object({
            rol: Joi.string().valid('PRINCIPAL',
              'NFT',
              'GALERIA',
              'DNIFRONTAL',
              'DNITRASERA',
              'USERDNI').required(),
            base64: Joi.number().required(),
          })
        ).required(),
    });

    export const querySchemaAddDoc = Joi.object({
      project_id:Joi.number().required(),
      docs: Joi.array().items(
        Joi.object({
          rol: Joi.string().valid('DOSSIER',
            'DETALLES',
            'TESTIGOS,',
            'UBICACION',
            'PLANOS',
            'ECONOMICO',
            'DESCARGABLE').required(),
          base64: Joi.number().required(),
        })
      ).required(),
    });
    export const querySchemaUpdateProjectEscenario = Joi.object({
      project_id:Joi.number().required(),
      escenario:Joi.string().valid('CONSERVADOR',
        'MODERADO',
        'FAVORABLE').required(),   
        aporte_inversores:Joi.number(), 
        beneficio:Joi.number(), 
        rentabilidad:Joi.number(),  
        coste_activo:Joi.number(),  
        costo_construccion:Joi.number(),
        gestion_xperiend:Joi.number(),
        coste_desarrollo:Joi.number(),
        coste_promocion:Joi.number(),
        recursion:Joi.number()
    });
  
    export const querySchemaUpdateProjectFechas = Joi.object({
      project_id:Joi.number().required(), 
        fecha_inicio_reinversion:Joi.date(),
        fecha_fin_reinversion:Joi.date(),
        fecha_reclamo:Joi.date(),
        fecha_fin_venta:Joi.date(),
        fecha_inicio_intercambio:Joi.date(),
        fecha_fin_intercambio:Joi.date(),
        visible_user:Joi.boolean(),
        visible_premium:Joi.boolean(),
        visible_gold:Joi.boolean()
    });
   
    export const querySchemaUpdateProjectCuentas = Joi.object({
      project_id:Joi.number().required(), 
       numero:Joi.string(),
       banco:Joi.string(),
       concepto_bancario:Joi.string()
    });

    export const querySchemaUpdateProject = Joi.object({
      project_id:Joi.number().required(), 
      rentabilidad_estimada:Joi.number(),
      beneficio_estimado:Joi.number(),
      plazo_ejecucion:Joi.number(),
      ejecucion_proyecto:Joi.number(),
      cantidad:Joi.number(),
      precio_unitario:Joi.number,
      beneficioPorNFT:Joi.number(),
      proyectoReinversion:Joi.number(),
      description:Joi.string(),
      recuperar_dinero_info:Joi.string(),
      pagoTransferencia:Joi.boolean(),
      pagoTarjeta:Joi.boolean(),
      pagoCripto:Joi.boolean()
    });
    export const querySchemaUpdateProjectEstado = Joi.object({
      project_id:Joi.number().required(), 
      estado:Joi.string().valid('PROXIMAMENTE','PUBLICO','ABIERTO',
      'EN_PROCESO',
      'NO_COMPLETADO',
      'CERRADO',
      'TERMINADO').required()
    });


      export const querySchemaUpdateProjectUserSaleManage = Joi.object({
        project_id:Joi.number().required(), 
        tipoDeUser:Joi.string().valid('REGULAR',
          'PREMIUM',
          'PREMIUMGOLD').required(),
        openingDate:Joi.date().required(),
        minXRENwallet:Joi.number().required(),
        minXRENstake:Joi.number()
      });
      export const querySchemaUpdateProjectTemplate = Joi.object({
        project_id:Joi.number().required(), 
        template_id:Joi.string().required(),
      document_type:Joi.string().valid('COMPRA',
        'INTERCAMBIO',
        'RECOMPRA',
        'RECLAMACION',
        'REINVERSION').required()
      });
      export const querySchemaUpdateCuentaXREN = Joi.object({
        cuenta_id:Joi.number().required()
      });

      export const querySchemaUpdateTransferXren= Joi.object({
        order_id:Joi.number().required(),
        success:Joi.boolean().required()
      });

      export const querySchemaUpdateKyc= Joi.object({
        kyc_id:Joi.number().required(),
        status:Joi.string().valid('APROBADO',
          'RECHAZADO',
          'PENDIENTE').required(),
        motivo_rechazo:Joi.string()
      });

      export const querySchemaChangeAdmin= Joi.object({
       user_id:Joi.number().required(),
       rol:Joi.string().valid('CLIENT',
       'ADMIN').required()
      });
      export const querySchemaUpdateTransferParticipaciones= Joi.object({
        order_id:Joi.number().required(),amountUSD:Joi.number().required(),status:Joi.string().valid('PAGADO_Y_ENTREGADO_Y_FIRMADO',
          'PAGO_PENDIENTE',
          'ERROR_EN_PAGO',
          'POR_FIRMAR',
          'FIRMADO_POR_ENTREGAR',
          'PAGO_CANCELADO',
          'PAGO_DEVUELTO',
          'POR_INTERCAMBIAR').required(),fecha_recibido:Joi.date(),fecha_devolucion:Joi.date()
       });
 



    
    



