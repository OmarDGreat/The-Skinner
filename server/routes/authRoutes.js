import express from 'express';
import passport from 'passport';

const router = express.Router();

// Redirects user to Steam for authentication
router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }));

// Handles Steam callback and redirects to the frontend
router.get(
  '/steam/return',
  (req, res, next) => {
    req.url = req.originalUrl; // Fix potential issues with Vercel's URL handling
    next();
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    if (!req.user) {
      console.error('Authentication failed.');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('User authenticated:', req.user);
    res.redirect(`${process.env.FRONTEND_URL}/profile`); // Redirect to frontend
  }
);

export default router;
