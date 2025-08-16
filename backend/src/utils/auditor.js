import AuditLog from '../models/audit.model.js';

export async function audit({ entityType, entityId, changedBy, changeType, oldValue, newValue }) {
  try {
    await AuditLog.create({ entityType, entityId, changedBy, changeType, oldValue, newValue });
  } catch (e) {
    console.error('Audit error:', e.message);
  }
}