import Attachment from '../models/attachment.model.js';

export async function listAttachments(req, res) {
  const files = await Attachment.find({ lead: req.params.leadId }).sort({ uploadedAt: -1 });
  res.json(files);
}

export async function addAttachment(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  const item = await Attachment.create({ lead: req.params.leadId, fileUrl, uploadedBy: req.user.sub });
  res.json(item);
}