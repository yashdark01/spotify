
import { User } from '../models/user.model.js';


export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}});
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

