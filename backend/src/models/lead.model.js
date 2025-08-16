import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 150 },
  email: { type: String, maxlength: 150 },
  phone: { type: String, maxlength: 20 },
  company: { type: String, maxlength: 150 },
  source: { type: String, maxlength: 50 },
  city: { type: String, maxlength: 100 },
  category: { type: String, maxlength: 100 },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadStatus', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quotationAmount: { type: Number }
}, { timestamps: true });

leadSchema.index({ status: 1, assignedTo: 1, createdBy: 1, email: 1, phone: 1 });

export default mongoose.model('Lead', leadSchema);