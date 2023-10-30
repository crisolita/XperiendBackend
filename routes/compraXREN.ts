import express from "express";
import { authenticateToken } from "../middleware/auth";
import { compraXRENCripto, compraXRENStripe, compraXRENTransferenciaBancaria, ordersXREN, ordersXRENByUser } from "../controllers/compraXREN";
import { isAdmin } from "../middleware/isAdmin";
import Joivalidator from "express-joi-validation";
import { querySchemaCompraXRENCripto, querySchemaCompraXRENStripe, querySchemaCompraXRENTransferencia } from "../middleware/validation";
import { isKycRequired } from "../middleware/kycRequired";
import { getGestionVentaXREN } from "../controllers/backoffice";

const validator = Joivalidator.createValidator({passError: true});

const router = express.Router();


router.post("/transferencia",validator.body(querySchemaCompraXRENTransferencia),isKycRequired, compraXRENTransferenciaBancaria);
router.post("/cripto", validator.body(querySchemaCompraXRENCripto),authenticateToken,compraXRENCripto);

router.post("/stripe", validator.body(querySchemaCompraXRENStripe),isKycRequired,compraXRENStripe);

router.get('/orders',isAdmin,ordersXREN)
router.get('/gestionXREN',getGestionVentaXREN)

router.get('/ordersByUser',authenticateToken,ordersXRENByUser)

export default router;



