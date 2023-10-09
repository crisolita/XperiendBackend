import express from "express";
import { authenticateToken } from "../middleware/auth";
import { compraParticipacionStripe, compraParticipacionTransferenciaBancaria, createIntercambio, prueba  } from "../controllers/participaciones";
import { isKycRequired } from "../middleware/kycRequired";

const router = express.Router();

//NFTs?
router.post("/compra-participacion-transferencia", isKycRequired, compraParticipacionTransferenciaBancaria);
router.post("/compra-participacion-stripe", isKycRequired, compraParticipacionStripe);

router.get("/prueba",prueba)
router.post("/createExchange",createIntercambio)


export default router;



