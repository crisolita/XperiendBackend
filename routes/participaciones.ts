import express from "express";
import { authenticateToken } from "../middleware/auth";
import { allPagos, compraParticipacionStripe, compraParticipacionTransferenciaBancaria, createIntercambio, orders, ordersByUser, pagosByUser, prueba  } from "../controllers/participaciones";
import { isKycRequired } from "../middleware/kycRequired";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

//NFTs?
router.post("/compra-participacion-transferencia", isKycRequired, compraParticipacionTransferenciaBancaria);
router.post("/compra-participacion-stripe", isKycRequired, compraParticipacionStripe);

router.get("/prueba",prueba)
router.post("/createExchange",createIntercambio)

router.get('/orders',isAdmin,orders)
router.get('/ordersByUser',authenticateToken,ordersByUser)

router.get('/pagos',isAdmin,allPagos)
router.get('/pagosByUser',authenticateToken,pagosByUser)

export default router;



