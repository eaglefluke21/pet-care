import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import UserModel from '../models/User.js';

dotenv.config();

passport.use('google-signup',new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/OauthRoutes/google/signup/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
   
      let user = await UserModel.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

     
      user = new UserModel({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
        
        
      });

      await user.save();
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});


export {passport as signupPassport};