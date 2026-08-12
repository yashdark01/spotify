import { Router } from "express";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();    

// router.get('/check', protectRoute, requireAdmin, checkAdmin);

// router.post('/songs', protectRoute, requireAdmin,  createSong);
// router.delete('/songs/:id', protectRoute, requireAdmin,  deleteSong);

// router.post('/albums', protectRoute, requireAdmin,  createAlbum);
// router.delete('/albums/:id', protectRoute, requireAdmin,  deleteAlbum);


router.use(protectRoute, requireAdmin);
router.get('/check', checkAdmin);

router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);


export default router;