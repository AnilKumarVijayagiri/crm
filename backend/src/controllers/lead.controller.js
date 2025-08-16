import Lead from '../models/lead.model.js';
import LeadStatus from '../models/status.model.js';
import { audit } from '../utils/auditor.js';

export async function listLeads(req, res) {
  const filter = {};
  if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
  if (req.query.status) filter.status = req.query.status;
  const leads = await Lead.find(filter).populate('status assignedTo createdBy').sort({ updatedAt: -1 });
  res.json(leads);
}

export async function getLead(req, res) {
  const lead = await Lead.findById(req.params.id).populate('status assignedTo createdBy');
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
}

export async function createLead(req, res) {
  try {
    const { name, email, phone, company, source, city, category, assignedTo } = req.body;
    const status = await LeadStatus.findOne({ name: 'Registered' });
    const lead = await Lead.create({
      name, email, phone, company, source, city, category,
      status: status._id,
      assignedTo: assignedTo || req.user.sub,
      createdBy: req.user.sub
    });
    await audit({ entityType: 'Lead', entityId: lead._id, changedBy: req.user.sub, changeType: 'create', newValue: lead });
    res.json(lead);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function updateLead(req, res) {
  try {
    const oldLead = await Lead.findById(req.params.id);
    if (!oldLead) return res.status(404).json({ error: 'Not found' });
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await audit({ entityType: 'Lead', entityId: updated._id, changedBy: req.user.sub, changeType: 'update', oldValue: oldLead, newValue: updated });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function changeStatus(req, res) {
  try {
    const { statusName, quotationAmount } = req.body;
    const status = await LeadStatus.findOne({ name: statusName });
    if (!status) return res.status(400).json({ error: 'Invalid status' });
    const oldLead = await Lead.findById(req.params.id);
    const updated = await Lead.findByIdAndUpdate(req.params.id, { status: status._id, quotationAmount }, { new: true });
    await audit({ entityType: 'Lead', entityId: updated._id, changedBy: req.user.sub, changeType: 'update', oldValue: oldLead, newValue: updated });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}