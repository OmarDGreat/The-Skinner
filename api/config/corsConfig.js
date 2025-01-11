import cors from 'cors';

const corsConfig = cors({
  origin: ['https://the-skinner.vercel.app'], // Add your frontend domain
  credentials: true, // Allow sending cookies
});

export default corsConfig;
