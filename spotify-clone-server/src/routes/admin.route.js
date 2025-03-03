import { Router } from "express";
import { getAdmin, createSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();    

router.get('/', getAdmin);

router.post('/songs', protectRoute, requireAdmin,  createSong);
export default router;