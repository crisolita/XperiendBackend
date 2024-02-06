import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  getKycInfoByUser,
  getUserById,
  updateKyc,
  updateUser,
} from "../service/user";
import { uploadImage } from "../service/aws";
import { sendKycRellenado } from "../service/mail";

export const submitKYC = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;
    const {
      name,
      lastname,
      country_born,
      birth,
      estado_civil,
      regimen_matrimonial,
      telf,
      address,
      document,
      nivel_inversion,
      document_number,
      city,
      postalCode,
      state,
      country,
      foto_dni_frontal,
      foto_dni_trasera,
      wallet,
      cuenta_bancaria,
      residencia_fiscal,
    } = req.body;
    const user = await getUserById(USER.id, prisma);
    const kycAlready = await getKycInfoByUser(USER.id, prisma);
    const alreadyWallet = await prisma.kycInfo.findUnique({
      where: { wallet },
    });
    let info,
      dataImages = [];
    if (!user) return res.status(404).json({ error: "User no encontrado" });
    if (alreadyWallet)
      return res.status(400).json({ error: "Wallet ya ha sido registrada" });

    if (kycAlready?.status == "APROBADO" || kycAlready?.status == "PENDIENTE") {
      return res.status(400).json({ error: "Kyc aprobado o pendiente" });
    } else if (kycAlready?.status == "RECHAZADO") {
      return res.status(400).json({ error: "Kyc Rechazado, actualizar datos" });
    } else if (!kycAlready) {
      info = await prisma.kycInfo.create({
        data: {
          user_id: user.id,
          name,
          lastname,
          country_born,
          cuenta_bancaria,
          birth: new Date(birth),
          telf,
          document,
          document_number,
          address,
          city,
          postalCode,
          state,
          country,
          wallet,
          estado_civil,
          nivel_inversion,
          regimen_matrimonial,
          status: "PENDIENTE",
        },
      });
      await updateUser(USER.id, { kycStatus: "PENDIENTE" }, prisma);

      let base64Frontal,
        pathFrontal,
        pathTrasera,
        base64Trasera,
        base64Fiscal,
        pathFiscal;
      if (document == "DNI" && foto_dni_frontal && foto_dni_trasera) {
        pathFrontal = `kyc_image_${user.id}_${info.id}_${"DNIFRONTAL"}`;
        pathTrasera = `kyc_image_${user.id}_${info.id}_${"DNITRASERA"}`;

        base64Frontal = foto_dni_frontal.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        base64Trasera = foto_dni_trasera.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64Frontal, "base64");
        await uploadImage(data, pathFrontal);
        let img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathFrontal,
            rol: "DNIFRONTAL",
          },
        });
        dataImages.push(img);
        data = Buffer.from(base64Trasera, "base64");
        await uploadImage(data, pathTrasera);
        img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathTrasera,
            rol: "DNITRASERA",
          },
        });
        dataImages.push(img);
      } else if (document == "PASAPORTE" && foto_dni_frontal) {
        pathFrontal = `kyc_image_${user.id}_${info.id}_${"DNIFRONTAL"}`;

        base64Frontal = foto_dni_frontal.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64Frontal, "base64");
        await uploadImage(data, pathFrontal);
        let img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathFrontal,
            rol: "DNIFRONTAL",
          },
        });
        dataImages.push(img);
      } else {
        await prisma.kycInfo.delete({ where: { id: info.id } });
        await updateUser(user.id, { kycStatus: undefined }, prisma);
        return res
          .status(400)
          .json({ error: "No hay suficientes fotos de los documentos" });
      }
      if (residencia_fiscal) {
        pathFiscal = `kyc_image_${user.id}_${info.id}_${"RESIDENCIA_FISCAL"}`;

        base64Fiscal = residencia_fiscal.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64Fiscal, "base64");
        await uploadImage(data, pathFiscal);
        let img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathFiscal,
            rol: "RESIDENCIA_FISCAL",
          },
        });
        dataImages.push(img);
      }
      await sendKycRellenado(
        user.email,
        user.userName ? user.userName : "querido usuario"
      );
      return res.json({ info, dataImages });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
export const updateKYC = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    // @ts-ignore
    const USER = req.user as User;
    const {
      name,
      lastname,
      estado_civil,
      regimen_matrimonial,
      residencia_fiscal,
      country_born,
      birth,
      telf,
      address,
      document_number,
      document,
      city,
      postalCode,
      state,
      country,
      foto_dni_frontal,
      foto_dni_trasera,
      wallet,
      prueba_titularidad,
    } = req.body;
    const user = await getUserById(USER.id, prisma);
    const kycAlready = await getKycInfoByUser(USER.id, prisma);
    let info, img;
    if (!user) return res.status(404).json({ error: "User no encontrado" });
    if (kycAlready?.status == "APROBADO" || kycAlready?.status == "PENDIENTE") {
      return res.status(400).json({ error: "Kyc aprobado o pendiente" });
    } else if (!kycAlready) {
      return res.status(400).json({ error: "Kyc no creado" });
    } else if (kycAlready?.status == "RECHAZADO") {
      info = await updateKyc(
        kycAlready.id,
        {
          estado_civil,
          regimen_matrimonial,
          name,
          lastname,
          document_number,
          country_born,
          birth,
          telf,
          address,
          document,
          city,
          postalCode,
          state,
          country,
          wallet,
          status: "PENDIENTE",
        },
        prisma
      );
      await updateUser(USER.id, { kycStatus: "PENDIENTE" }, prisma);
      if (foto_dni_frontal) {
        const path = `kyc_image_${user.id}_${info.id}_DNIFRONTAL`;
        const data = Buffer.from(
          foto_dni_frontal.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
          "base64"
        );
        await uploadImage(data, path);
      }
      if (foto_dni_trasera) {
        const path = `kyc_image_${user.id}_${info.id}_DNITRASERA`;
        const data = Buffer.from(
          foto_dni_trasera.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
          "base64"
        );
        await uploadImage(data, path);
      }
      const image = await prisma.kycImages.findFirst({
        where: { info_id: info.id, rol: "RESIDENCIA_FISCAL" },
      });
      if (residencia_fiscal && image) {
        const pathFiscal = `kyc_image_${user.id}_${
          info.id
        }_${"RESIDENCIA_FISCAL"}`;

        const base64Fiscal = residencia_fiscal.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64Fiscal, "base64");
        await uploadImage(data, pathFiscal);
      } else if (residencia_fiscal) {
        const pathFiscal = `kyc_image_${user.id}_${
          info.id
        }_${"RESIDENCIA_FISCAL"}`;
        img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathFiscal,
            rol: "RESIDENCIA_FISCAL",
          },
        });
        const base64Fiscal = residencia_fiscal.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64Fiscal, "base64");
        await uploadImage(data, pathFiscal);
      }
      const imageTitularidad = await prisma.kycImages.findFirst({
        where: { info_id: info.id, rol: "TITULAR_CUENTA" },
      });
      if (prueba_titularidad && imageTitularidad) {
        const pathTitularidad = `kyc_image_${user.id}_${
          info.id
        }_${"TITULARIDAD"}`;

        const base64titular = prueba_titularidad.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64titular, "base64");
        await uploadImage(data, pathTitularidad);
      } else if (prueba_titularidad) {
        const pathTitular = `kyc_image_${user.id}_${info.id}_${"TITULARIDAD"}`;
        img = await prisma.kycImages.create({
          data: {
            info_id: info.id,
            path: pathTitular,
            rol: "TITULAR_CUENTA",
          },
        });
        const base64titular = prueba_titularidad.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        );
        let data = Buffer.from(base64titular, "base64");
        await uploadImage(data, pathTitular);
      }
      await sendKycRellenado(user.email, `${info.name} ${info.lastname}`);
      return res.json({ info, img });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
