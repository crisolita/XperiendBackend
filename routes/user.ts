import express from "express";
import {
  userRegisterController,
  userLoginController,
  changePasswordController,
  getRecoveryCode,
  getAuthCode,
  getAllUsersController,
  userGoogleController,
  changeNewsletter,
  getUserInfo,
  
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
router.get("/",getAllUsersController)
router.get("/userInfo",authenticateToken, getUserInfo)



router.post("/getRecovery",getRecoveryCode)
router.post("/changePassword", changePasswordController);

router.post("/login", userLoginController);
router.post("/getAuth",validator.body(querySchemaUGetAuth),getAuthCode)


router.post("/googleAuth", userGoogleController);
router.put("/changeNewsletter",authenticateToken,changeNewsletter)

export default router;
