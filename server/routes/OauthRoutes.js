import { Router } from "express";
import passport from "passport";
import createJwt from "../utils/createJwt.js";

 const router = Router();

 router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false 
}));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
 
    const token = createJwt(req.user); 
    console.log('logging token from backend', token);
    const redirectUrl = `http://localhost:5173/google-callback?token=${token}`;
    console.log('Redirecting to:', redirectUrl); // Log the redirect URL
    res.redirect(redirectUrl);
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

 
