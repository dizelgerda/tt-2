import express from "express";

const router = express.Router();

router.get("/me");
router.get("/:userID");

export default router;
