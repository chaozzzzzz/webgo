import { Router } from "express";
import { getUser, login, updateUser, deleteUser, register, logout, getCurrentUser } from "../controllers/userController.js";
const router = Router();

//router.get("/", getUser);
//router.post("/", createUser);
// router.patch("/", updateUser);
// router.delete("/", deleteUser);

router.get("/", getCurrentUser);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);


export default router;