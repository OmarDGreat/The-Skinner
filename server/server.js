import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import corsConfig from './config/corsConfig.js';
import sessionMiddleware from './middleware/sessionConfig.js';
import passport from './config/passportConfig.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import connectDB from './config/connectDB.js';

const PORT = process.env.PORT || 5000;

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
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', apiRoutes);  // API routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Export the app for Vercel serverless functions
export default app;
