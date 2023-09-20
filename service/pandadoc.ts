import * as pd_api from "pandadoc-node-client";
import { getKycInfoByUser, getUserById } from "./user";
import { PrismaClient} from "@prisma/client";
import { getProjectById } from "./backoffice";
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
export const crearDocumentoDeCompra= async (userId:number,project_id:number,prisma:PrismaClient) => {
    const user= await getUserById(userId,prisma)
    const project=await getProjectById(project_id,prisma)
    if(user ) {
            const kycInfo= await getKycInfoByUser(user?.id,prisma)

        const documentCreateRequest: pd_api.DocumentCreateRequest = {
            name: "Documento de venta",
            templateUuid:"eWwha59cftFdfQVecqg825",
            tags: ["Esta es una venta"],
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
            ensureSentDocument(document.id)
            if(!ensureSentDocument) return undefined
            const sent= await apiInstanceDocuments.sendDocument({
                  id: String(document.id),
                  documentSendRequest: {
                    silent: false,
                    subject: "Contrato de venta pendiente por firmar",
                    message: "Para continuar con el proceso de venta usted debe firmar el siguiente contrato",
                  },
                });
                return document.id
          }
    }
}