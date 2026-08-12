import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {clerkMiddleware, getAuth} from '@clerk/express';
import { connectDB } from './lib/db.js';
import fileUpload from 'express-fileupload';
import path from 'path';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import  adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumsRoutes from './routes/albums.route.js';
import statsRoutes from './routes/stats.route.js';


dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,

}));
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(clerkMiddleware());
// app.use(withAuth)
app.use((req, res, next) => {
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
        console.log("User is not authenticated");
        return res.status(401).json({ error: "Unauthorized - Token expired or invalid" });
    }

    console.log("User is authenticated", userId);
    console.log("Session claims:", sessionClaims);  

    next();
});
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 12 * 1024 * 1024 },
}));    

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/stats', statsRoutes);


//error handling middleware

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({message : process.env.NODE_ENV === 'production' ? 'Something went wrong, please try again later' : error.message});
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
}
);


