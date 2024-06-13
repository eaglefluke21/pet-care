import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import OauthUserModel from '../models/OauthUser';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our DB
      let user = await OauthUserModel.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // If not, create a new user
      user = new OauthUserModel({
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value
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
    const user = await OauthUserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});