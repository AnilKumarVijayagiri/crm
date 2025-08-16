import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // Admin, Sales Head, Sales Team Lead, Sales Representative
}, { timestamps: true });

export default mongoose.model('Role', roleSchema);