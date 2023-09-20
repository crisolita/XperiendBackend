import express from "express";
import { authenticateToken } from "../middleware/auth";
import { prueba } from "../controllers/participaciones";
// import { compraParticipacionStripe } from "../controllers/participaciones";

const router = express.Router();

//NFTs?
// router.post("/compra-participacion", authenticateToken, compraParticipacionStripe);

router.get("/prueba",prueba)


export default router;



