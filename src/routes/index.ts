import { Router } from 'express';

import message from './message.route';
import channel from './channel.route';

const router = Router();

router.use('/messages', message);
router.use('/channels', channel);

export default router;
