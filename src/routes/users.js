import express from "express";
import {verifyUsers,verifyUsersId} from "../controllers/users";
const router = express.Router();


router.get("/users", verifyUsers);
router.get("/users/:id", verifyUsersId);

export default router;