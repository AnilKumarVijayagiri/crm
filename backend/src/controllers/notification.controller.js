import Notification from '../models/notification.model.js';

export async function listNotifications(req, res) {
  const items = await Notification.find({ user: req.user.sub }).sort({ createdAt: -1 }).limit(100);
  res.json(items);
}

export async function markRead(req, res) {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ ok: true });
}