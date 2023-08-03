import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
const router = Router();

router.post('/', messageController.createMessage);
router.get('/', messageController.displayMessages);
router.delete('/:id', messageController.archiveMessage);

export default router;
