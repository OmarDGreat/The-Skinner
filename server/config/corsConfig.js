import cors from 'cors';

const corsConfig = cors({
    origin: process.env.NODE_ENV === 'development' ? 'https://localhost:5173' : 'https://your-frontend-domain.com',
    credentials: true, // Allow cookies to be sent
  })
export default corsConfig;
