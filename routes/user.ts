import express from "express";
import {
  userRegisterController,
  userLoginController,
  changePasswordController,
  getRecoveryCode,
  getAuthCode,
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { querySchemaRegistro, querySchemaUGetAuth } from "../middleware/validation";
const validator = Joivalidator.createValidator({passError: true});

const router = express.Router();


router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.post("/changePassword", changePasswordController);
router.post("/login", userLoginController);
router.post("/getRecovery",getRecoveryCode)
router.post("/getAuth",validator.body(querySchemaUGetAuth),getAuthCode)

export default router;
