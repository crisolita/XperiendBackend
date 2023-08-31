import express from "express";
import { authenticateToken } from "../middleware/auth";
import bodyParser from "body-parser";
import { createVerifySession, webhookControler } from "../controllers/kyc";

const router = express.Router();



// / KNOW YOUR CLIENT
router.post("/create-verification-session", authenticateToken, createVerifySession);
router.post("/webhook",bodyParser.raw({type: 'application/json'}), authenticateToken, webhookControler);

export default router;



