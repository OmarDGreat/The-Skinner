import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173', // Local HTTP frontend
  'https://localhost:5173', // Local HTTPS frontend
  'https://your-frontend-domain.vercel.app' // Replace with your deployed frontend domain
];

const corsConfig = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true, // Allow cookies and credentials
});

export default corsConfig;
