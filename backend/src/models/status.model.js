import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // Registered, Contacted, Call Back, Follow-Up, Not Interested, Enrolled
}, { timestamps: true });

export default mongoose.model('LeadStatus', statusSchema);