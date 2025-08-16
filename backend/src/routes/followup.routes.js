import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { listFollowups, createFollowup, updateFollowup } from '../controllers/followup.controller.js';

const router = Router();

router.get('/', authRequired, listFollowups);
router.post('/', authRequired, createFollowup);
router.put('/:id', authRequired, updateFollowup);

export default router;