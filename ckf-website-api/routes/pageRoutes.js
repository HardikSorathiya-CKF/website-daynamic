import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
    getPages,
    getPage,
    getPageBySlug,
    createPage,
    updatePage,
    updatePageStatus,
    deletePage
} from "../controllers/pageController.js";

const router = express.Router();

router.get("/slug/:slug", getPageBySlug);

router.use(protect);
router.use(authorize("superadmin"));

router.get("/", getPages);
router.post("/create", createPage);
router.get("/:id", getPage);
router.put("/:id", updatePage);
router.patch("/:id/status", updatePageStatus);
router.delete("/:id", deletePage);

export default router;
