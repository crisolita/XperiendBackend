import express from "express";
import { addImage, createProject, deleteImage, getAllProjects, getImagesByProject, updateProject } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();



router.post("/create-project", authenticateToken, createProject);
router.get("/getProjects", getAllProjects);
router.get("/getImagesByProject",getImagesByProject)
router.delete("/deleteImage",deleteImage)
router.post("/addImage", addImage);
router.post("/updateProject", updateProject);






export default router;



