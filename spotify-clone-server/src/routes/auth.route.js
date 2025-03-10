import { Router } from "express";
import { authCallback, getUser } from "../controller/auth.controller.js";

const router = Router();

router.post('/callback', authCallback );
 router.get('/callback', getUser);

export default router;