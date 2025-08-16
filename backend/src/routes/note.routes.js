import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { listNotes, createNote } from '../controllers/note.controller.js';

const router = Router();

router.get('/:leadId', authRequired, listNotes);
router.post('/:leadId', authRequired, createNote);

export default router;