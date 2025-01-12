import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'default-secret', // Session secret
  resave: false, // Avoid resaving unchanged sessions
  saveUninitialized: false, // Avoid creating empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/sessions', // MongoDB session storage
    ttl: 14 * 24 * 60 * 60, // Sessions expire after 14 days
  }),
  cookie: {
    httpOnly: true, // Protect cookies from being accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'none', // Cross-origin requests need SameSite set to 'none'
  },
});

export default sessionMiddleware;
