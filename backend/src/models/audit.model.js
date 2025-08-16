import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changeType: { type: String, enum: ['create', 'update', 'delete'], required: true },
  oldValue: { type: Object },
  newValue: { type: Object }
}, { timestamps: { createdAt: 'changedAt', updatedAt: false } });

auditSchema.index({ entityType: 1, entityId: 1 });

export default mongoose.model('AuditLog', auditSchema);