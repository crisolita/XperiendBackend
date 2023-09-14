import express from "express";
import { addImage, createProject, deleteImage, getAllProjects, getImagesByProject, manageSaleUser, sentDocuement, updateProjectCantidadYPrecio, updateProjectCuenta, updateProjectEscenario, updateProjectPlazoYBeneficio } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();


//proyectos
router.post("/create-project", isAdmin, createProject);
router.get("/getProjects",authenticateToken, getAllProjects);
router.get("/getImagesByProject",isAdmin,getImagesByProject)
router.delete("/deleteImage",isAdmin,deleteImage)
router.post("/addImage", isAdmin,addImage);
//gestion
router.put("/updateEscenario", isAdmin,updateProjectEscenario);
router.put("/updateCuenta", isAdmin,updateProjectCuenta);
router.put("/updatePrecio", isAdmin,updateProjectCantidadYPrecio);
router.put("/updatePlazo", isAdmin,updateProjectPlazoYBeneficio);
router.post("/manageUserSale", isAdmin,manageSaleUser);


router.post("/test",sentDocuement);














export default router;



