import cors from 'cors';

const corsConfig = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Use environment variable for the frontend URL
  credentials: true, // Allow credentials (cookies)
});

export default corsConfig;
