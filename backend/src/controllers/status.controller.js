import LeadStatus from '../models/status.model.js';

export async function listStatuses(req, res) {
  const all = await LeadStatus.find({}).sort({ name: 1 });
  res.json(all);
}

export async function seedStatuses(req, res) {
  const defaults = ['Registered', 'Contacted', 'Call Back', 'Follow-Up', 'Not Interested', 'Enrolled'];
  const existing = await LeadStatus.find({ name: { $in: defaults } });
  const missing = defaults.filter(d => !existing.find(e => e.name === d));
  if (missing.length) await LeadStatus.insertMany(missing.map(name => ({ name })));
  res.json({ inserted: missing });
}