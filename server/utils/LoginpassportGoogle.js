import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import UserModel from '../models/User.js';

dotenv.config();

const apiUrl = process.env.API_URL;

passport.use('google-login', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${apiUrl}/OauthRoutes/google/login/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
    
      let user = await UserModel.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      } else {
        
        return done(null, false, { message: 'User not found' });
      }
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

export {passport as loginPassport };
