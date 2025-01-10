import express from 'express';

const router = express.Router();

router.get('/profile', (req, res) => {
  console.log('Cookies:', req.cookies); // Check received cookies
  console.log('Session:', req.session); // Check session details
  console.log('Session user:', req.user); // Check user in session

  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(req.user); // Send user data
});

export default router;
