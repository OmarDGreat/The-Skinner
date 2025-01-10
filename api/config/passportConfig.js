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
      returnURL: process.env.STEAM_RETURN_URL || 'http://localhost:5000/auth/steam/return',
      realm: process.env.STEAM_REALM || 'http://localhost:5000',
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

// Serialize user into the session
passport.serializeUser((steamId, done) => {
  if (!steamId) {
    done(new Error('No Steam ID provided for serialization'));
  } else {
    done(null, steamId);
    console.log('Serializing user ID:', steamId);
  }
});

// Deserialize user from the session
passport.deserializeUser(async (steamId, done) => {
  try {
    const user = await findUserById(steamId);
    if (!user) {
      throw new Error(`User with Steam ID ${steamId} not found`);
    }
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});

export default passport;
