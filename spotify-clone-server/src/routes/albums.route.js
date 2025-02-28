import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello This Albums Routes!');
}
);

export default router;