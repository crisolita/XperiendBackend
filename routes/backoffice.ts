import express from "express";
import { addImage, createProject, deleteImage, getAllProjects, getImagesByProject } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();


//proyectos
router.post("/create-project", isAdmin, createProject);
router.get("/getProjects",authenticateToken, getAllProjects);
router.get("/getImagesByProject",isAdmin,getImagesByProject)
router.delete("/deleteImage",isAdmin,deleteImage)
router.post("/addImage", isAdmin,addImage);







export default router;



