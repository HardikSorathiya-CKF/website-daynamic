import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getUsers, getUser, createUser, updateUser, updateUserStatus, deleteUser } from "../controllers/userController.js";

const router = express.Router();
router.use(protect);
router.use(authorize("superadmin"));
router.get("/", getUsers);
router.post("/create", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);

export default router;
