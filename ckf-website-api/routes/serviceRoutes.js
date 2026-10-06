import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
    getServices,
    getService,
    getServiceBySlug,
    getPublicServices,
    createService,
    updateService,
    updateServiceStatus,
    deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/list", getPublicServices);
router.get("/slug/:slug", getServiceBySlug);

router.use(protect);
router.use(authorize("superadmin"));

router.get("/", getServices);
router.post("/create", createService);
router.get("/:id", getService);
router.put("/:id", updateService);
router.patch("/:id/status", updateServiceStatus);
router.delete("/:id", deleteService);

export default router;
