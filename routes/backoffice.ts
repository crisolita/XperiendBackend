import express from "express";
import { addImage, cambiarStatusDeTransferenciaParaXREN, createProject, deleteImage, getAllProjects, getCuentaByProject, getCuentas, getFechasByProject, getImagesByProject, getKycImage, getKycInfo, manageSaleUser, selectCuentaBancariaXREN, updateKYCStatus, updateProjectCantidadYPrecio, updateProjectCuenta, updateProjectEscenario, updateProjectEstado, updateProjectFechas, updateProjectPlazoYBeneficio } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();


//proyectos
router.post("/create-project", createProject);
router.get("/getProjects",authenticateToken, getAllProjects);
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

router.post("/manageUserSale", isAdmin,manageSaleUser);
///vistas
router.get("/escenario")
router.get("/cuentas",getCuentas)
router.get("/cuentaByProject",getCuentaByProject)
router.get("/fechas",getFechasByProject)


//Compra XREN
router.post("/cuentaXREN",selectCuentaBancariaXREN);
router.put("/updateTransferenciaXREN",authenticateToken,cambiarStatusDeTransferenciaParaXREN)


//gestion KYC
router.get("/getAllKYC",getKycInfo);
router.get("/getKycImages",getKycImage);
router.put("/manageKYC",updateKYCStatus)



















export default router;



