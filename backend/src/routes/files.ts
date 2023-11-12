import express from "express";
import { getFileByID } from "../controllers/files";

const router = express.Router();

router.get("/:docID", getFileByID);

export default router;
