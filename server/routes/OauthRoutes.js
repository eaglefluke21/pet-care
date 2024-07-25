import { Router } from "express";
import { loginPassport } from "../utils/LoginpassportGoogle.js";
import { signupPassport } from "../utils/SignuppassportGoogle.js";
import createJwt from "../utils/createJwt.js";

 const router = Router();

 router.get('/google/signup', signupPassport.authenticate('google-signup', {
  scope: ['profile', 'email'],
  session: false 
}));


router.get('/google/signup/callback', 
  signupPassport.authenticate('google-signup', { failureRedirect: '/' }),
  (req, res) => {

    const token = createJwt(req.user); 
    console.log('logging token from backend', token);
    const redirectUrl = `http://localhost:5173/google-callback?token=${token}`;
    console.log('Redirecting to:', redirectUrl); 
    res.redirect(redirectUrl);
  }
);


router.get('/google/login', loginPassport.authenticate('google-login', {
  scope: ['profile', 'email'],
  session: false 
}));


router.get('/google/login/callback', 
  loginPassport.authenticate('google-login', { failureRedirect: '/login?error=user_not_found' }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login?error=user_doesnt_exist');
    }

    const token = createJwt(req.user);
    const redirectUrl = `http://localhost:5173/google-callback?token=${token}`;
    res.redirect(redirectUrl);
  }
);




router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

 
