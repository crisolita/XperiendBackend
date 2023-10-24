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
  
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { querySchemaRegistro, querySchemaUGetAuth } from "../middleware/validation";
const validator = Joivalidator.createValidator({passError: true});

const router = express.Router();


router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.get("/userInfo",authenticateToken, getUserInfo)



router.post("/getRecovery",getRecoveryCode)
router.post("/changePassword", changePasswordController);

router.post("/login", userLoginController);
router.post("/getAuth",validator.body(querySchemaUGetAuth),getAuthCode)


router.post("/googleAuth", userGoogleController);
router.put("/changeNewsletter",authenticateToken,changeNewsletter)

router.put('/setFav',authenticateToken,setFavorite)
router.get('/getFavs',authenticateToken,getFavorites)
export default router;
