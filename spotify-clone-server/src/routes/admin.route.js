import { Router } from "express";

const router = Router();    

router.get('/', (req, res) => {
    res.send('Hello This Admin Routes!');
}
);

export default router;