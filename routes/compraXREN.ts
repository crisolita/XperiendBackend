import express from "express";
import { authenticateToken } from "../middleware/auth";
import { compraXRENCripto, compraXRENStripe, compraXRENTransferenciaBancaria } from "../controllers/compraXREN";

const router = express.Router();


router.post("/transferencia",authenticateToken, compraXRENTransferenciaBancaria);
router.post("/cripto", authenticateToken,compraXRENCripto);

router.post("/stripe", authenticateToken,compraXRENStripe);

export default router;



