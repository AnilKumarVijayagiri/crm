import Note from '../models/note.model.js';

export async function listNotes(req, res) {
  const notes = await Note.find({ lead: req.params.leadId }).populate('user').sort({ createdAt: -1 });
  res.json(notes);
}

export async function createNote(req, res) {
  const { note } = req.body;
  const item = await Note.create({ lead: req.params.leadId, user: req.user.sub, note });
  res.json(item);
}