import { Router } from 'express';
import { listStatuses, seedStatuses } from '../controllers/status.controller.js';

const router = Router();

router.get('/', listStatuses);
router.post('/seed', seedStatuses);

export default router;