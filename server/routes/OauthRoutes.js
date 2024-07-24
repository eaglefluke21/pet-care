import { Router } from "express";
import passport from "passport";
import createJwt from "../utils/createJwt.js";
import UserModel from "../models/User.js";

 const router = Router();

 router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false 
}));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  async(req, res) => {

    console.log(req.user.googleId);

    let user = await UserModel.findOne({ googleId: req.user.googleId });

    if(user){
      return res.redirect(`http://localhost:5173/home`)
    }

      if (!user) {

        return res.redirect(`http://localhost:5173/login?error=user_not_found`);
      }
 
    const token = createJwt(req.user); 
    console.log('logging token from backend', token);
    const redirectUrl = `http://localhost:5173/google-callback?token=${token}`;
    console.log('Redirecting to:', redirectUrl); 
    res.redirect(redirectUrl);
  }
);


router.get('/checkOauthuser', (req,res) => {

});






router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

 
