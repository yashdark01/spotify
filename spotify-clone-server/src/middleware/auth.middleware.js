import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
        res.status(401).json({error: 'Unauthorizedou - you must be logged in to access this resource'});
        return;
    }
    next();
}


export const requireAdmin = async (req, res, next) => {
    try{
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin){
            res.status(403).json({error: 'Unauthorized- you must be an admin to access this resource'});
            return;
        }   

        next();
    }catch(error){
        console.error('Error in requireAdmin middleware', error);
        next(error);
    }
}

