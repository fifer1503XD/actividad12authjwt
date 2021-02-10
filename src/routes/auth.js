import express from "express";
import {login, signIn} from "../controllers/auth";
const router = express.Router();

router.post("/login", login);
router.post("/signin", signIn);


export default router;