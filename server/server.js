import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './config/passportConfig.js';
import sessionMiddleware from './middleware/sessionConfig.js';
import corsConfig from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import connectDB from './config/connectDB.js';



dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
