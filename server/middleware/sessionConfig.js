import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'default-secret', // Secret for signing session ID cookie
  resave: false, // Do not save the session if it hasn't been modified
  saveUninitialized: false, // Do not save empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/sessions', // Persistent MongoDB session storage
    ttl: 14 * 24 * 60 * 60, // Optional: Set time-to-live for sessions (14 days)
  }),
  cookie: {
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: false, // process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'none', // Allow cross-origin cookies
  },
});

export default sessionMiddleware;
