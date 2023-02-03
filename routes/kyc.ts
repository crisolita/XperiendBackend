import express from "express";
import { createNaturalUser } from "../controllers/kyc";
const router = express.Router();
import Joivalidator from "express-joi-validation";
import { querySchemaKYC } from "../middleware/validation";
const validator = Joivalidator.createValidator();
// validator.body(querySchemaKYC)
router.post("/create", createNaturalUser);
export default router;
