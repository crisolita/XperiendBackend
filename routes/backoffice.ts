import express from "express";
import { addDoc, addImage, cambiarStatusDeTransferenciaParaXREN, cambiarStatusDeTransferenciaParticipacion, changeRolUser, createProject, deleteImage, getAllProjects, getAllUsersByProject, getAllUsersController, getCuentas, getTemplatesByPandaDoc, manageSaleUser, selectCuentaBancariaXREN, updateKYCStatus, updateProjectController, updateProjectCuenta, updateProjectEscenario, updateProjectEstado, updateProjectFechas, updateProjectTemplateDocs } from "../controllers/backoffice";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();


//proyectos
router.post("/create-project", isAdmin,createProject);
router.get("/getProjects", getAllProjects);
router.delete("/deleteImage",isAdmin,deleteImage)
router.post("/addImage", isAdmin,addImage);
router.post("/addDoc", isAdmin,addDoc);

//gestion
router.post("/updateEscenario", isAdmin,updateProjectEscenario);
router.post("/updateFechas", isAdmin,updateProjectFechas);

router.put("/updateCuenta",isAdmin,updateProjectCuenta);
router.put("/updateProject", isAdmin,updateProjectController);
router.put("/updateEstado", isAdmin,updateProjectEstado);


router.post("/manageUserSale",isAdmin,manageSaleUser);

router.post("/updatetemplate",isAdmin,updateProjectTemplateDocs);

///vistas
router.get("/cuentas",getCuentas)

router.get("/templates",getTemplatesByPandaDoc)
router.get("/users",getAllUsersController)

router.get("/usersByProject",getAllUsersByProject)




//Compra XREN
router.post("/cuentaXREN",selectCuentaBancariaXREN);
router.put("/updateTransferenciaXREN",authenticateToken,cambiarStatusDeTransferenciaParaXREN)


//gestion KYC
router.put("/manageKYC",updateKYCStatus)


///gestion usuarios
router.post('/changeAdmin',isSuperAdmin,changeRolUser)


/// gestion compra participaciones
router.put("/update-transferencia-participacion",isAdmin,cambiarStatusDeTransferenciaParticipacion)




















export default router;



