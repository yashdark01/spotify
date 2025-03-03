import {Router} from 'express';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/like', protectRoute, (req, res) => {
   
    res.send('Hello This User Routes!');
}
);

router.post('/', (req, res) => {
    res.send('Hello This User Routes!');
}
);

router.put('/', (req, res) => {
    res.send('Hello This User Routes!');
}
);

router.delete('/', (req, res) => {
    res.send('Hello This User Routes!');
}
);
router.patch('/', (req, res) => {
    res.send('Hello This User Routes!');
}
);


export default router;