import { Router } from "express";
import { getAllSongs, getSongById, getFeaturedSongs, getTredingSongs, getMadeForYouSongs } from "../controller/song.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTredingSongs);

export default router;