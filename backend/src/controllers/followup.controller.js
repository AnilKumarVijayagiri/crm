import FollowUp from '../models/followup.model.js';
import Notification from '../models/notification.model.js';

export async function listFollowups(req, res) {
  const filter = {};
  if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
  if (req.query.lead) filter.lead = req.query.lead;
  const items = await FollowUp.find(filter).populate('lead assignedTo').sort({ followupDate: 1 });
  res.json(items);
}

export async function createFollowup(req, res) {
  const { lead, assignedTo, followupDate, channel, notes } = req.body;
  const item = await FollowUp.create({ lead, assignedTo: assignedTo || req.user.sub, followupDate, channel, notes });
  await Notification.create({ user: item.assignedTo, message: 'New follow-up scheduled', link: `/leads/${lead}` });
  res.json(item);
}

export async function updateFollowup(req, res) {
  const item = await FollowUp.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
}