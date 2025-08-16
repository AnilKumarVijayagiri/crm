import { Router } from 'express';
import { authRequired, permit } from '../middleware/auth.js';
import { listLeads, getLead, createLead, updateLead, changeStatus } from '../controllers/lead.controller.js';

const router = Router();

router.get('/', authRequired, listLeads);
router.get('/:id', authRequired, getLead);
router.post('/', authRequired, createLead);
router.put('/:id', authRequired, updateLead);
router.post('/:id/status', authRequired, changeStatus);

export default router;