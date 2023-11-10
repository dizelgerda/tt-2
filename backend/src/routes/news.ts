import { Router } from "express";
import { create } from "../controllers/news";

const router = Router();

router.post("/", create);
router.patch("/:newsID");
router.delete("/:newsID");

export default router;
