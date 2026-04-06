import { updateUser } from "../controllers/useClerkController.js";
import express from "express";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;
