import express from 'express';
import passport from 'passport';

const router = express.Router();

// Redirects user to Steam for authentication
router.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }));

// Handles Steam callback and redirects to the frontend
// router.get(
//   '/auth/steam/return',
//   (req, res, next) => {
//     // Fix for potential issues with req.url being stripped by Express
//     req.url = req.originalUrl;
//     next();
//   },
//   passport.authenticate('steam', { failureRedirect: '/' }),
//   (req, res) => {
//     if (!req.user) {
//       // Log error if user authentication failed
//       console.error('Error: User authentication failed.');
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     console.log('Authenticated user:', req.user);
//     console.log('Session data after login:', req.session);

//     // Redirect user to the frontend profile page after successful authentication
//     res.redirect('https://localhost:5173/profile'); // Adjust this to your frontend URL
//   }
// );

router.get('/auth/steam/return', (req, res) => {
  req.session.passport = {
    user: {
      steamId: 'mockSteamId',
      displayName: 'Mock User',
      photos: [],
    },
  };
  res.redirect('https://localhost:5173/profile');
});


// Add a utility route to check session data (optional)
router.get('/auth/session', (req, res) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({
    user: req.user,
    session: req.session,
  });
});

export default router;
