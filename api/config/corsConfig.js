import cors from 'cors';

const corsConfig = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies)
});

export default corsConfig;
