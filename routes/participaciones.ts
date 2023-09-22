import express from "express";
import { authenticateToken } from "../middleware/auth";
import { compraParticipacionTransferenciaBancaria  } from "../controllers/participaciones";
import { isKycRequired } from "../middleware/kycRequired";

const router = express.Router();

//NFTs?
router.post("/compra-participacion-transferencia", isKycRequired, compraParticipacionTransferenciaBancaria);

// router.get("/prueba",prueba)


export default router;



