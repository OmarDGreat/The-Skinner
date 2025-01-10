import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import corsConfig from './config/corsConfig.js';
import sessionMiddleware from './middleware/sessionConfig.js';
import passport from './config/passportConfig.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import connectDB from './config/connectDB.js';

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api', apiRoutes);

// Log server status when running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally at http://localhost:${PORT}`);
  });
}

// Export handler for Vercel
export default (req, res) => {
  app(req, res);
};
