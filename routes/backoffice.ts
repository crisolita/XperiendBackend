import express from "express";
import { addImage, cambiarStatusDeTransferenciaParaXREN, cambiarStatusDeTransferenciaParticipacion, changeRolUser, createProject, deleteImage, getAllProjects, getCuentaByProject, getCuentas, getFechasByProject, getImagesByProject, getKycImage, getKycInfo, getTemplatesByPandaDoc, getUserSalesManage, manageSaleUser, selectCuentaBancariaXREN, updateKYCStatus, updateProjectController, updateProjectCuenta, updateProjectEscenario, updateProjectEstado, updateProjectFechas, updateProjectTemplateDocs } from "../controllers/backoffice";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();


//proyectos
router.post("/create-project", isAdmin,createProject);
router.get("/getProjects", getAllProjects);
router.get("/getImagesByProject",getImagesByProject)
router.delete("/deleteImage",isAdmin,deleteImage)
router.post("/addImage", isAdmin,addImage);
//gestion
router.post("/updateEscenario", isAdmin,updateProjectEscenario);
router.post("/updateFechas", isAdmin,updateProjectFechas);

router.put("/updateCuenta",isAdmin,updateProjectCuenta);
router.put("/updateProject", isAdmin,updateProjectController);
router.put("/updateEstado", isAdmin,updateProjectEstado);


router.post("/manageUserSale",isAdmin,manageSaleUser);

router.post("/updatetemplate",isAdmin,updateProjectTemplateDocs);

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


/// gestion compra participaciones
router.put("/update-transferencia-participacion",isAdmin,cambiarStatusDeTransferenciaParticipacion)




















export default router;



