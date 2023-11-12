import express from "express";
import { getCurrentUser } from "../controllers/users";

const router = express.Router();

router.get("/me", getCurrentUser);
// router.get("/:docID");

export default router;
