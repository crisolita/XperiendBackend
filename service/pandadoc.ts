import * as pd_api from "pandadoc-node-client";
import { getKycInfoByUser, getUserById } from "./user";
import { PrismaClient} from "@prisma/client";
import { getProjectById } from "./backoffice";
import { DocumentType } from "aws-sdk";
// replace it with your API key
const API_KEY = "4eb0dfbe4c091333e7fd909a3dd16fe2b5ecb054";
const configuration = pd_api.createConfiguration(
    { authMethods: {apiKey: `API-Key ${API_KEY}`} }
);

const apiInstanceDocuments = new pd_api.DocumentsApi(configuration);
const apiInstanceTemplate= new pd_api.TemplatesApi(configuration)
export const ensureSentDocument= async (documentId:string) =>{
  const MAX_CHECK_RETRIES=6;
  let retries=0;
  while (retries < MAX_CHECK_RETRIES) {
    await new Promise((r) => setTimeout(r, 2000));
    retries++;

    let response = await apiInstanceDocuments.statusDocument({
      id: String(documentId),
    });
    if (response.status === "document.draft") {
      return true;
    }
  }
}

export const isCompleted= async (documentId:string) =>{

    let response = await apiInstanceDocuments.statusDocument({
      id: String(documentId),
    });
    if (response.status === "document.completed") {
      return true;
    }
}

export const crearDocumentoDeCompra= async (userId:number,project_id:number,template_id:string,prisma:PrismaClient) => {
    const user= await getUserById(userId,prisma)
    const project=await getProjectById(project_id,prisma)
    if(user ) {
            const kycInfo= await getKycInfoByUser(user?.id,prisma)

        const documentCreateRequest: pd_api.DocumentCreateRequest = {
            name: "Documento de Compra",
            templateUuid:template_id,
            tags: ["Esta es una Compra"],
            recipients: [
              {
                email: user.email,
                firstName: kycInfo?.name,
                lastName: kycInfo?.lastname,
                role:"Client",
                signingOrder: 1,
              }
            ],
            "tokens": [
              {
                  "name": "Client.Company",
                  "value": `${user.id}`
              },
              {
                  "name": "Client.FirstName",
                  "value": `${kycInfo?.name}`
              },
              {
                  "name": "Client.LastName",
                  "value": `${kycInfo?.lastname}`
              },
              {
                "name": "project.name",
                "value": `${project?.titulo}`
            },
            {
              "name": "project.id",
              "value": `${project?.id}`
          }
          ],
          };
          const document= await apiInstanceDocuments.createDocument({
            documentCreateRequest: documentCreateRequest,
          });
          if(document.id){
           const sure= await ensureSentDocument(document.id)
            if(!sure) return undefined
            const sent= await apiInstanceDocuments.sendDocument({
                  id: String(document.id),
                  documentSendRequest: {
                    silent: true,
                    subject: "Contrato de venta pendiente por firmar",
                    message: "Para continuar con el proceso de venta usted debe firmar el siguiente contrato",
                  },
                });
                console.log(sent)
                const doc= await apiInstanceDocuments.detailsDocument({id:document.id})
                return {id:document.id,link:doc.recipients? doc.recipients[0].sharedLink : undefined}
          }
    }
}
export const crearDocumentoReclamacion= async (userId:number,project_id:number,template_id:string,prisma:PrismaClient) => {
  const user= await getUserById(userId,prisma)
  const project=await getProjectById(project_id,prisma)
  if(user ) {
          const kycInfo= await getKycInfoByUser(user?.id,prisma)

      const documentCreateRequest: pd_api.DocumentCreateRequest = {
          name: "Documento de Reclamacion",
          templateUuid:template_id,
          tags: ["Esta es una reclamaciion"],
          recipients: [
            {
              email: user.email,
              firstName: kycInfo?.name,
              lastName: kycInfo?.lastname,
              role:"Client",
              signingOrder: 1,
            }
          ],
          "tokens": [
            {
                "name": "Client.Company",
                "value": `${user.id}`
            },
            {
                "name": "Client.FirstName",
                "value": `${kycInfo?.name}`
            },
            {
                "name": "Client.LastName",
                "value": `${kycInfo?.lastname}`
            },
            {
              "name": "project.name",
              "value": `${project?.titulo}`
          },
          {
            "name": "project.id",
            "value": `${project?.id}`
        }
        ],
        };
        const document= await apiInstanceDocuments.createDocument({
          documentCreateRequest: documentCreateRequest,
        });
        if(document.id){
         const sure= await ensureSentDocument(document.id)
          if(!sure) return undefined
          const sent= await apiInstanceDocuments.sendDocument({
                id: String(document.id),
                documentSendRequest: {
                  silent: true,
                  subject: "Contrato de reclamacion pendiente por firmar",
                  message: "Para continuar con el proceso de reclamar usted debe firmar el siguiente contrato",
                },
              });
              console.log(sent)
              const doc= await apiInstanceDocuments.detailsDocument({id:document.id})
              return {id:document.id,link:doc.recipients? doc.recipients[0].sharedLink : undefined}
        }
  }
}

export const crearDocumentoReinversion= async (userId:number,project_id:number,template_id:string,prisma:PrismaClient) => {
  const user= await getUserById(userId,prisma)
  const project=await getProjectById(project_id,prisma)
  if(user ) {
          const kycInfo= await getKycInfoByUser(user?.id,prisma)

      const documentCreateRequest: pd_api.DocumentCreateRequest = {
          name: "Documento de Reinversion",
          templateUuid:template_id,
          tags: ["Esta es una reinversion"],
          recipients: [
            {
              email: user.email,
              firstName: kycInfo?.name,
              lastName: kycInfo?.lastname,
              role:"Client",
              signingOrder: 1,
            }
          ],
          "tokens": [
            {
                "name": "Client.Company",
                "value": `${user.id}`
            },
            {
                "name": "Client.FirstName",
                "value": `${kycInfo?.name}`
            },
            {
                "name": "Client.LastName",
                "value": `${kycInfo?.lastname}`
            },
            {
              "name": "project.name",
              "value": `${project?.titulo}`
          },
          {
            "name": "project.id",
            "value": `${project?.id}`
        }
        ],
        };
        const document= await apiInstanceDocuments.createDocument({
          documentCreateRequest: documentCreateRequest,
        });
        if(document.id){
         const sure= await ensureSentDocument(document.id)
          if(!sure) return undefined
          const sent= await apiInstanceDocuments.sendDocument({
                id: String(document.id),
                documentSendRequest: {
                  silent: true,
                  subject: "Contrato de reinversion pendiente por firmar",
                  message: "Para continuar con el proceso de reinversion usted debe firmar el siguiente contrato",
                },
              });
              console.log(sent)
              const doc= await apiInstanceDocuments.detailsDocument({id:document.id})
              return {id:document.id,link:doc.recipients? doc.recipients[0].sharedLink : undefined}
        }
  }
}
export const crearDocumentoDeIntercambio= async (userId:number,userReceiverId:number,project_id:number,template_id:string,prisma:PrismaClient) => {
  const user= await getUserById(userId,prisma)
  const receiver= await getUserById(userReceiverId,prisma)
  const project=await getProjectById(project_id,prisma)
  if(user && receiver) {
          const kycInfo= await getKycInfoByUser(user.id,prisma)
          const infoUser2= await getKycInfoByUser(receiver.id,prisma)
      const documentCreateRequest: pd_api.DocumentCreateRequest = {
          name: "Documento de Intercambio",
          templateUuid:template_id,
          tags: ["Esta es un intercambio"],
          recipients: [
            {
              email: user.email,
              firstName: kycInfo?.name,
              lastName: kycInfo?.lastname,
              role:"Vendedor",
              signingOrder: 1,
            },
            {
              email: receiver.email,
              firstName: infoUser2?.name,
              lastName: infoUser2?.lastname,
              role:"Comprador",
              signingOrder: 2,
            }
          ],
          "tokens": [
            {
                "name": "Client.Company",
                "value": ``
            },
            {
                "name": "Client.FirstName",
                "value": `${kycInfo?.name}`
            },
            {
                "name": "Client.LastName",
                "value": `${kycInfo?.lastname}`
            },
            {
              "name": "project.name",
              "value": `${project?.titulo}`
          },
          {
            "name": "project.id",
            "value": `${project?.id}`
        }
        ],
        };
        const document= await apiInstanceDocuments.createDocument({
          documentCreateRequest: documentCreateRequest,
        });
        if(document.id){
         const sure= await ensureSentDocument(document.id)
          if(!sure) return undefined
          const sent= await apiInstanceDocuments.sendDocument({
                id: String(document.id),
                documentSendRequest: {
                  silent: false,
                  subject: "Contrato de intercambio pendiente por firmar",
                  message: "Para continuar con el proceso de intercambio usted debe firmar el siguiente contrato",
                },
              });
              console.log(sent)
              const doc= await apiInstanceDocuments.detailsDocument({id:document.id})
              return {id:document.id,link:doc.recipients? doc.recipients[0].sharedLink : undefined}
        }
  }
}
export const getTemplates= async () => {
return apiInstanceTemplate.listTemplates()
}
export const isValidTemplate= async (id:string) => {
  const data= (await apiInstanceTemplate.listTemplates()).results
  if(!data) return false
  for (const elemento of data) {
    if (elemento.id === id) {
      return true; // El ID se encontró en la tabla
    }
  }
  return false; // El ID no se encontró en la tabla
}

  

