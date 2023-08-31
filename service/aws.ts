import AWS from 'aws-sdk';
import fs from "fs"

const spacesEndpoint = new AWS.Endpoint(process.env.SPACEENDPOINT? process.env.SPACEENDPOINT : "");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACEKEYID,
  secretAccessKey: process.env.SPACESECRETKEY,
});
// Subir una imagen
export const uploadImage = async (key:string,ruta:string)=>{

  const params = {
    Bucket: 'xperiend-images',
    Key: `${key}.jpg`,
    Body: fs.createReadStream(`${ruta}.jpg`),
  };
  s3.upload(params, function(err:any, data:any) {
    if (err) {
      console.error('Error al subir la imagen:', err);
    } else {
      console.log('Imagen subida:', data.Location);
    }
  });
}
// Obtener una imagen
export const getImage = async (key:string)=>{
  const getObjectParams = {
    Bucket: 'xperiend-images',
    Key: `${key}.jpg`,
  };
  const imageUrl = s3.getSignedUrl('getObject', getObjectParams);
  return imageUrl;
}
