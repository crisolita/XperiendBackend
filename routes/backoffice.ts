import express from "express";
import { createProject } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();



// / KNOW YOUR CLIENT
router.post("/create-project", isAdmin, createProject);


export default router;



