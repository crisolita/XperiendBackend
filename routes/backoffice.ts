import express from "express";
import { addImage, cambiarStatusDeTransferenciaParaXREN, changeRolUser, createProject, deleteImage, getAllProjects, getCuentaByProject, getCuentas, getFechasByProject, getImagesByProject, getKycImage, getKycInfo, getTemplatesByPandaDoc, getUserSalesManage, manageSaleUser, selectCuentaBancariaXREN, updateKYCStatus, updateProjectCantidadYPrecio, updateProjectCuenta, updateProjectEscenario, updateProjectEstado, updateProjectFechas, updateProjectPlazoYBeneficio, updateProjectTemplateDocs } from "../controllers/backoffice";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();


//proyectos
router.post("/create-project", createProject);
router.get("/getProjects", getAllProjects);
router.get("/getImagesByProject",getImagesByProject)
router.delete("/deleteImage",isAdmin,deleteImage)
router.post("/addImage", isAdmin,addImage);
//gestion
router.post("/updateEscenario", isAdmin,updateProjectEscenario);
router.post("/updateFechas", isAdmin,updateProjectFechas);

router.put("/updateCuenta",updateProjectCuenta);
router.put("/updatePrecio", isAdmin,updateProjectCantidadYPrecio);
router.put("/updatePlazo", isAdmin,updateProjectPlazoYBeneficio);
router.put("/updateEstado", isAdmin,updateProjectEstado);

router.post("/manageUserSale",manageSaleUser);

router.post("/updatetemplate",updateProjectTemplateDocs);

///vistas
router.get("/escenario")
router.get("/cuentas",getCuentas)
router.get("/cuentaByProject",getCuentaByProject)
router.get("/fechas",getFechasByProject)
router.get("/userSaleManage",getUserSalesManage)
router.get("/templates",getTemplatesByPandaDoc)



//Compra XREN
router.post("/cuentaXREN",selectCuentaBancariaXREN);
router.put("/updateTransferenciaXREN",authenticateToken,cambiarStatusDeTransferenciaParaXREN)


//gestion KYC
router.get("/getAllKYC",getKycInfo);
router.get("/getKycImages",getKycImage);
router.put("/manageKYC",updateKYCStatus)


///gestion usuarios
router.post('/changeAdmin',isSuperAdmin,changeRolUser)



















export default router;



