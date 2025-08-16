import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 150 },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  profilePicUrl: { type: String }
}, { timestamps: true });

//userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);