import cors from 'cors';

const corsConfig = cors({
  origin: [
    'the-skinner-front-back.vercel.app', // Replace with your frontend's domain
    'http://localhost:5173' // For local development
  ],
  credentials: true, // Allow cookies and headers like Authorization
});

export default corsConfig;
