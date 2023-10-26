import express from "express";
import { addDoc, addImage, cambiarStatusDeTransferenciaParaXREN, cambiarStatusDeTransferenciaParticipacion, changeRolUser, createProject, deleteImage, getAllProjects, getAllUsersByProject, getAllUsersController, getCuentas, getTemplatesByPandaDoc, manageSaleUser, selectCuentaBancariaXREN, updateKYCStatus, updateProjectController, updateProjectCuenta, updateProjectEscenario, updateProjectEstado, updateProjectFechas, updateProjectTemplateDocs } from "../controllers/backoffice";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { querySchemaAddDoc, querySchemaAddImage, querySchemaChangeAdmin, querySchemaCreate_project, querySchemaDeleteImage, querySchemaUpdateCuentaXREN, querySchemaUpdateKycStatus, querySchemaUpdateProject, querySchemaUpdateProjectCuentas, querySchemaUpdateProjectEscenario, querySchemaUpdateProjectEstado, querySchemaUpdateProjectFechas, querySchemaUpdateProjectTemplate, querySchemaUpdateProjectUserSaleManage, querySchemaUpdateTransferParticipaciones, querySchemaUpdateTransferXren } from "../middleware/validation";
import Joivalidator from "express-joi-validation";

const validator = Joivalidator.createValidator({passError: true});

const router = express.Router();


//proyectos
router.post("/create-project",validator.body(querySchemaCreate_project), isAdmin,createProject);
router.get("/getProjects", getAllProjects);
router.delete("/deleteImage",validator.body(querySchemaDeleteImage),isAdmin,deleteImage)
router.post("/addImage", validator.body(querySchemaAddImage),isAdmin,addImage);
router.post("/addDoc",validator.body(querySchemaAddDoc), isAdmin,addDoc);

//gestion
router.post("/updateEscenario",validator.body(querySchemaUpdateProjectEscenario), isAdmin,updateProjectEscenario);
router.post("/updateFechas",validator.body(querySchemaUpdateProjectFechas), isAdmin,updateProjectFechas);

router.put("/updateCuenta",validator.body(querySchemaUpdateProjectCuentas),isAdmin,updateProjectCuenta);
router.put("/updateProject",validator.body(querySchemaUpdateProject), isAdmin,updateProjectController);
router.put("/updateEstado",validator.body(querySchemaUpdateProjectEstado), isAdmin,updateProjectEstado);


router.post("/manageUserSale",validator.body(querySchemaUpdateProjectUserSaleManage),isAdmin,manageSaleUser);

router.post("/updatetemplate",validator.body(querySchemaUpdateProjectTemplate),isAdmin,updateProjectTemplateDocs);

///vistas
router.get("/cuentas",getCuentas)

router.get("/templates",getTemplatesByPandaDoc)
router.get("/users",getAllUsersController)

router.get("/usersByProject",getAllUsersByProject)




//Compra XREN
router.post("/cuentaXREN",validator.body(querySchemaUpdateCuentaXREN),selectCuentaBancariaXREN);
router.put("/updateTransferenciaXREN",validator.body(querySchemaUpdateTransferXren),isAdmin,cambiarStatusDeTransferenciaParaXREN)


//gestion KYC
router.put("/manageKYC",validator.body(querySchemaUpdateKycStatus),updateKYCStatus)


///gestion usuarios
router.post('/changeAdmin',validator.body(querySchemaChangeAdmin),isSuperAdmin,changeRolUser)


/// gestion compra participaciones
router.put("/update-transferencia-participacion",validator.body(querySchemaUpdateTransferParticipaciones),isAdmin,cambiarStatusDeTransferenciaParticipacion)




















export default router;



