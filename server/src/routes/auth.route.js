import { Router } from "express";
import { authCallback, getUser } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/callback', protectRoute, authCallback);
router.get('/callback', getUser);

export default router;