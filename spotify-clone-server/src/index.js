import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import  adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumsRoutes from './routes/albums.route.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/stats', statsRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);


