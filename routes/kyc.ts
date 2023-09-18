import express from "express";
import { authenticateToken } from "../middleware/auth";
import { submitKYC, updateKYC } from "../controllers/kyc";

const router = express.Router();



// / KNOW YOUR CLIENT
router.post("/submitKYC", authenticateToken, submitKYC);
router.put("/updateKYC", authenticateToken, updateKYC);


export default router;



