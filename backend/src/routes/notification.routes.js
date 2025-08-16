import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { listNotifications, markRead } from '../controllers/notification.controller.js';

const router = Router();

router.get('/', authRequired, listNotifications);
router.post('/:id/read', authRequired, markRead);

export default router;