import { clerkClient, getAuth, requireAuth } from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);  // Get user ID safely

        console.log('protectRoute middleware called', userId);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized - You must be logged in to access this resource' });
        }

        req.userId = userId;  // Store userId for next middleware/routes
        next();

    } catch (error) {
        console.error('Error in protectRoute middleware', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);  // Get userId securely

        if (!userId) {
            return res.status(401).json({ isAdmin: false, error: 'Unauthorized - No user ID found' });
        }

        const currentUser = await clerkClient.users.getUser(userId);
        
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ isAdmin: false, error: 'Forbidden - You must be an admin to access this resource' });
        }

        req.user = currentUser;  // Store user details for next middlewares/routes
        next();

    } catch (error) {
        console.error('Error in requireAdmin middleware', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

