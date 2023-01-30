import express from "express";
import {
  userRegisterController,
  userLoginController,
  userTokenValidate,
  recoverPasswordSendTokenController,
  changePasswordController,
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { querySchemaRegistro } from "../middleware/validation";
const validator = Joivalidator.createValidator();

const router = express.Router();

// router.get("/", authenticateToken, isAdmin, userController);

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);

router.post("/recover-password-sendToken", recoverPasswordSendTokenController);

router.post("/recover-password-changePassword", changePasswordController);

router.post("/login", userLoginController);

router.post("/validate", userTokenValidate);

// router.post("/canTransfer", isAdmin, userCanTransferController);

export default router;
