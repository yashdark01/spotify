import {Router} from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllUsers } from '../controller/user.controller.js';


const router = Router();

router.use(protectRoute);

router.get('/', getAllUsers);
// router.get('/:id', getUserById);

// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);


export default router;