import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
    getCaseStudies,
    getCaseStudy,
    getCaseStudyBySlug,
    getPublicCaseStudies,
    createCaseStudy,
    updateCaseStudy,
    updateCaseStudyStatus,
    deleteCaseStudy
} from "../controllers/caseStudyController.js";

const router = express.Router();

router.get("/list", getPublicCaseStudies);
router.get("/slug/:slug", getCaseStudyBySlug);

router.use(protect);
router.use(authorize("superadmin"));

router.get("/", getCaseStudies);
router.post("/create", createCaseStudy);
router.get("/:id", getCaseStudy);
router.put("/:id", updateCaseStudy);
router.patch("/:id/status", updateCaseStudyStatus);
router.delete("/:id", deleteCaseStudy);

export default router;
