import { Router } from "express";
import { createNews, getNewsByUserID, getNewsByID } from "../controllers/news";
import { uploadFiles } from "../controllers/files";

const router = Router();

// router.get("/");
router.get("/owner/:userID", getNewsByUserID);
router.get("/:docID", getNewsByID);

router.post("/", createNews);
router.post("/:docID/files", uploadFiles);

// router.patch("/:docID");
// router.delete("/:docID");

export default router;
