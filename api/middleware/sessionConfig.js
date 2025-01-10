import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'default-secret', // Secret for signing session ID cookie
  resave: false, // Do not save session if it hasn't been modified
  saveUninitialized: false, // Do not save empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Persistent MongoDB session storage
    ttl: 14 * 24 * 60 * 60, // Time-to-live for sessions (14 days)
  }),
  cookie: {
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: true, // Only send cookies over HTTPS
    sameSite: 'none', // Allow cross-origin cookies
  },
});

export default sessionMiddleware;
