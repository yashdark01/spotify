import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    // console.log('protectRoute middleware called', req.auth.userId);

    if(!req.auth.userId){
        res.status(401).json({error: 'Unauthorized - you must be logged in to access this resource'});
        return;
    }
    //  console.log('User is authenticated', req.auth.userId);
    next();
}


export const requireAdmin = async (req, res, next) => {
    try{
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        console.log('currentUser', currentUser);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        console.log('isAdmin', isAdmin);
        if(!isAdmin){
            res.status(403).json({isAdmin:false, error: 'Unauthorized-you must be an admin to access this resource'});
            return;
        }
        console.log('User is an admin', req.auth.userId);

        next();
    }catch(error){
        console.error('Error in requireAdmin middleware', error);
        next(error);
    }
}

