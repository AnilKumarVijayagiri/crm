import mongoose from 'mongoose';

const followupSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  followupDate: { type: Date, required: true },
  channel: { type: String, maxlength: 20 }, // call, email, whatsapp
  notes: { type: String },
  status: { type: String, enum: ['open', 'done', 'skipped'], default: 'open' }
}, { timestamps: true });

followupSchema.index({ followupDate: 1, status: 1, assignedTo: 1 });

export default mongoose.model('FollowUp', followupSchema);