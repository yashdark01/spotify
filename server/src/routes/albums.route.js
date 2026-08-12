import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);


export default router;