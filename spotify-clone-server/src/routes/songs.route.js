import { Router } from "express";
import { getAllSongs, getSongById } from "../controller/song.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get('/', getAllSongs);
router.get('/:id', getSongById);

export default router;