import { Router } from "express";
import passport from "passport";


 const router = Router();

 router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false 
}));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond with token
    const token = generateToken(req.user); // Replace with your token generation logic
    res.cookie('jwt', token, { httpOnly: true }); // Set JWT token in cookie
    res.redirect('http://localhost:5173/home'); // Redirect to frontend URL
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

 
