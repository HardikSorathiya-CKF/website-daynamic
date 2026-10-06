import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
    getPermissions,
    getRoles,
    getRole,
    createRole,
    updateRole,
    assignPermissions,
    updateRoleStatus,
    deleteRole
} from "../controllers/roleController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("superadmin"));

router.get("/permissions", getPermissions);
router.get("/", getRoles);
router.post("/create", createRole);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.put("/:id/permissions", assignPermissions);
router.patch("/:id/status", updateRoleStatus);
router.delete("/:id", deleteRole);

export default router;
