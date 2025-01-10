import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String },
  photos: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
