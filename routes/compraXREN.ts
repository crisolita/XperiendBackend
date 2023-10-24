import express from "express";
import { authenticateToken } from "../middleware/auth";
import { compraXRENCripto, compraXRENStripe, compraXRENTransferenciaBancaria, ordersXREN, ordersXRENByUser } from "../controllers/compraXREN";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();


router.post("/transferencia",authenticateToken, compraXRENTransferenciaBancaria);
router.post("/cripto", authenticateToken,compraXRENCripto);

router.post("/stripe", authenticateToken,compraXRENStripe);

router.get('/orders',isAdmin,ordersXREN)
router.get('/ordersByUser',authenticateToken,ordersXRENByUser)

export default router;



