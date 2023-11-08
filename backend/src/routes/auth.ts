import { Router } from "express";
import { create, login, logout } from "../controllers/users";

const router = Router();

router.post("/sign-in", login);
router.post("/sign-up", create);
router.post("/logout", logout);

export default router;
