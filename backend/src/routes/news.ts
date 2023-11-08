import { Router } from "express";

const router = Router();

router.post("/");
router.patch("/:newsID");
router.delete("/:newsID");

export default router;
