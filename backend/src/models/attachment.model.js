import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: false } });

export default mongoose.model('Attachment', attachmentSchema);