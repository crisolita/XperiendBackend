import express from "express";
import {
  userRegisterController,
  userLoginController,
  changePasswordController,
  getRecoveryCode,
  getAuthCode,
  userGoogleController,
  changeNewsletter,
  getUserInfo,
  setFavorite,
  getFavorites,
  userCanBuy,
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import {
  querySchemaChangePassword,
  querySchemaGetRecoveryCode,
  querySchemaGoogleAuth,
  querySchemaLogin,
  querySchemaRegistro,
  querySchemaUGetAuth,
} from "../middleware/validation";
const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.get("/userInfo", authenticateToken, getUserInfo);

router.post(
  "/getRecovery",
  validator.body(querySchemaGetRecoveryCode),
  getRecoveryCode
);
router.post(
  "/changePassword",
  validator.body(querySchemaChangePassword),
  changePasswordController
);

router.post("/login", validator.body(querySchemaLogin), userLoginController);
router.post("/getAuth", validator.body(querySchemaUGetAuth), getAuthCode);

router.post(
  "/googleAuth",
  validator.body(querySchemaGoogleAuth),
  userGoogleController
);
router.put("/changeNewsletter", authenticateToken, changeNewsletter);

router.put("/setFav", authenticateToken, setFavorite);
router.get("/getFavs", authenticateToken, getFavorites);
router.post("/canBuy", authenticateToken, userCanBuy);

export default router;
