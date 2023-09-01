import express from "express";
import { createProject } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();



// / KNOW YOUR CLIENT
router.post("/create-project", authenticateToken, createProject);


export default router;



