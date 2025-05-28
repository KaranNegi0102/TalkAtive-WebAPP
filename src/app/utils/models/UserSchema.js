import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'busy'],
      default: 'offline', // Updated via WebSocket
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;