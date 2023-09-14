import express from "express";
import { authenticateToken } from "../middleware/auth";
// import { compraParticipacionStripe } from "../controllers/participaciones";

const router = express.Router();

//NFTs?
// router.post("/compra-participacion", authenticateToken, compraParticipacionStripe);


export default router;



