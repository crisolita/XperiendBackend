import express from "express";
import { authenticateToken } from "../middleware/auth";
import { submitKYC, updateKYC } from "../controllers/kyc";
import { querySchemaSubmitKyc } from "../middleware/validation";
import Joivalidator from "express-joi-validation";

const router = express.Router();
const validator = Joivalidator.createValidator({passError: true});


// / KNOW YOUR CLIENT
router.post("/submitKYC",validator.body(querySchemaSubmitKyc), authenticateToken, submitKYC);
router.put("/updateKYC",validator.body(querySchemaSubmitKyc), authenticateToken, updateKYC);


export default router;



