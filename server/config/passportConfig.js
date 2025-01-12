import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();


const findUserById = async (id) => {
  try {
    const user = await User.findOne({ steamId: id });
    return user;
  } catch (error) {
    console.error(`Error finding user with Steam ID ${id}:`, error);
    throw new Error('User query failed');
  }
};


// Configure Passport with Steam Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.STEAM_RETURN_URL,
      realm: process.env.STEAM_REALM,
      apiKey: process.env.STEAM_API_KEY,
    },
    async (identifier, profile, done) => {
      try {
        let user = await User.findOne({ steamId: profile.id });
        if (!user) {
          user = await User.create({
            steamId: profile.id,
            displayName: profile.displayName || 'Unknown',
            photos: profile.photos.map((photo) => photo.value),
          });
        }
        return done(null, user.steamId); // Save only Steam ID in the session
      } catch (error) {
        console.error('Error saving user:', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((steamId, done) => {
  if (!steamId) {
    console.error('Error: No Steam ID provided for serialization');
    done(new Error('No Steam ID provided for serialization'));
  } else {
    console.log('Successfully serialized Steam ID:', steamId);
    done(null, steamId);
  }
});

passport.deserializeUser(async (steamId, done) => {
  console.log('Attempting to deserialize Steam ID:', steamId);
  try {
    const user = await findUserById(steamId);
    if (!user) {
      console.error('Error: User not found during deserialization:', steamId);
      return done(new Error(`User with Steam ID ${steamId} not found`));
    }
    console.log('Successfully deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});


export default passport;
