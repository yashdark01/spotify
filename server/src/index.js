import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './lib/db.js';
import { validateEnv } from './lib/validateEnv.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumsRoutes from './routes/albums.route.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const allowedOrigins = (process.env.CLIENT_URL ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(rootDir, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 12 * 1024 * 1024 },
  })
);

/** Public health check — no auth required */
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/stats', statsRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong, please try again later'
        : error.message,
  });
});

export default app;

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun && process.env.NODE_ENV !== 'test') {
  validateEnv();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
  });
}
