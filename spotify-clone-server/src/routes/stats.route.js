import { Router} from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello This Stats Routes!');
}
);

export default router;