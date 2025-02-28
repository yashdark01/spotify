import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello This Auth Routes!');
}
);

export default router;